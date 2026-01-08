import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Preset {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  preview_image_url: string;
  preset_file_url: string;
  is_active: boolean;
  sort_order: number;
}

const Admin = () => {
  const { toast } = useToast();
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPreset, setEditingPreset] = useState<Preset | null>(null);
  const [formData, setFormData] = useState<Preset>({
    name: '',
    description: '',
    category: 'Профессиональные',
    price: 0,
    preview_image_url: '',
    preset_file_url: '',
    is_active: true,
    sort_order: 0,
  });

  const categories = ['Профессиональные', 'Тёплые', 'Холодные', 'Ретро', 'Нежные', 'Яркие'];

  useEffect(() => {
    loadPresets();
  }, []);

  const API_URL = 'https://functions.poehali.dev/cc2dd51e-b8c1-4664-b8d1-c08b95436f04';

  const loadPresets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setPresets(data.presets || []);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить пресеты',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingPreset ? `${API_URL}/${editingPreset.id}` : API_URL;
      const method = editingPreset ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingPreset ? 'Пресет обновлён' : 'Пресет добавлен',
        });
        resetForm();
        loadPresets();
      } else {
        throw new Error('Ошибка сохранения');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить пресет',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (preset: Preset) => {
    setEditingPreset(preset);
    setFormData(preset);
  };

  const handleToggleActive = async (preset: Preset) => {
    try {
      const response = await fetch(`${API_URL}/${preset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...preset, is_active: !preset.is_active }),
      });

      if (response.ok) {
        loadPresets();
        toast({
          title: 'Статус изменён',
          description: preset.is_active ? 'Пресет скрыт' : 'Пресет активирован',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось изменить статус',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingPreset(null);
    setFormData({
      name: '',
      description: '',
      category: 'Профессиональные',
      price: 0,
      preview_image_url: '',
      preset_file_url: '',
      is_active: true,
      sort_order: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Управление пресетами</h1>
          <p className="text-muted-foreground">Добавляй и редактируй пресеты для обработки фото</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{editingPreset ? 'Редактировать пресет' : 'Добавить новый пресет'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название пресета</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Cinematic Pro"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Кинематографичные цвета и глубокий контраст"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Категория</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="990"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="preview_image_url">URL превью изображения</Label>
                  <Input
                    id="preview_image_url"
                    value={formData.preview_image_url}
                    onChange={(e) => setFormData({ ...formData, preview_image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <Label htmlFor="preset_file_url">URL файла пресета (.cube или .3dl)</Label>
                  <Input
                    id="preset_file_url"
                    value={formData.preset_file_url}
                    onChange={(e) => setFormData({ ...formData, preset_file_url: e.target.value })}
                    placeholder="https://cdn.../preset.cube"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Загрузи файл пресета в S3 и вставь CDN-ссылку
                  </p>
                </div>

                <div>
                  <Label htmlFor="sort_order">Порядок сортировки</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="is_active" className="cursor-pointer">Активен (виден пользователям)</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Icon name={editingPreset ? 'Save' : 'Plus'} className="mr-2" size={16} />
                        {editingPreset ? 'Сохранить изменения' : 'Добавить пресет'}
                      </>
                    )}
                  </Button>
                  {editingPreset && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Список пресетов ({presets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {presets.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Пресеты ещё не добавлены</p>
                  </div>
                ) : (
                  presets.map((preset) => (
                    <div
                      key={preset.id}
                      className={`p-4 border rounded-lg ${preset.is_active ? 'border-border' : 'border-muted bg-muted/20'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold flex items-center gap-2">
                            {preset.name}
                            {!preset.is_active && (
                              <span className="text-xs bg-muted px-2 py-0.5 rounded">Скрыт</span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{preset.category}</p>
                        </div>
                        <span className="text-lg font-bold text-primary">₽{preset.price}</span>
                      </div>
                      <p className="text-sm mb-3">{preset.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(preset)}>
                          <Icon name="Edit" size={14} className="mr-1" />
                          Изменить
                        </Button>
                        <Button
                          size="sm"
                          variant={preset.is_active ? 'outline' : 'default'}
                          onClick={() => handleToggleActive(preset)}
                        >
                          <Icon name={preset.is_active ? 'EyeOff' : 'Eye'} size={14} className="mr-1" />
                          {preset.is_active ? 'Скрыть' : 'Показать'}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;