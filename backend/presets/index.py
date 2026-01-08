import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для управления пресетами - получение списка, добавление, редактирование"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            cursor.execute("""
                SELECT id, name, description, category, price, 
                       preview_image_url, preset_file_url, is_active, sort_order,
                       created_at, updated_at
                FROM presets 
                ORDER BY sort_order ASC, created_at DESC
            """)
            presets = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'presets': presets}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO presets (name, description, category, price, 
                                   preview_image_url, preset_file_url, 
                                   is_active, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body.get('name'),
                body.get('description', ''),
                body.get('category'),
                body.get('price'),
                body.get('preview_image_url', ''),
                body.get('preset_file_url'),
                body.get('is_active', True),
                body.get('sort_order', 0)
            ))
            
            new_id = cursor.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'message': 'Preset created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            path_params = event.get('pathParams', {})
            preset_id = path_params.get('id')
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                UPDATE presets 
                SET name = %s, description = %s, category = %s, price = %s,
                    preview_image_url = %s, preset_file_url = %s,
                    is_active = %s, sort_order = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (
                body.get('name'),
                body.get('description'),
                body.get('category'),
                body.get('price'),
                body.get('preview_image_url'),
                body.get('preset_file_url'),
                body.get('is_active'),
                body.get('sort_order'),
                preset_id
            ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Preset updated'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()
