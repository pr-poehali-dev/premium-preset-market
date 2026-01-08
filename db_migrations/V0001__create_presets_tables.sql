CREATE TABLE presets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    preview_image_url TEXT,
    preset_file_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_presets_category ON presets(category);
CREATE INDEX idx_presets_active ON presets(is_active);

CREATE TABLE preset_applications (
    id SERIAL PRIMARY KEY,
    preset_id INTEGER REFERENCES presets(id),
    original_image_url TEXT NOT NULL,
    processed_image_url TEXT,
    user_session_id VARCHAR(255),
    processing_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_preset_applications_session ON preset_applications(user_session_id);
CREATE INDEX idx_preset_applications_status ON preset_applications(processing_status);