import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PhoneDemoProps {
  onProcessComplete?: () => void;
  remainingProcesses: number;
}

interface Preset {
  id: number;
  name: string;
  category: string;
  preset_file_url: string;
}

const PhoneDemo = ({ onProcessComplete, remainingProcesses }: PhoneDemoProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<number | null>(null);
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/cc2dd51e-b8c1-4664-b8d1-c08b95436f04');
      if (response.ok) {
        const data = await response.json();
        const activePresets = (data.presets || []).filter((p: any) => p.is_active).slice(0, 3);
        setPresets(activePresets);
      }
    } catch (error) {
      console.error('Failed to load presets:', error);
    }
  };

  const getPresetGradient = (index: number) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-amber-500 to-orange-500',
      'from-blue-500 to-indigo-500',
    ];
    return gradients[index % gradients.length];
  };

  const getPresetIcon = (index: number) => {
    const icons = ['Film', 'Camera', 'Moon'];
    return icons[index % icons.length];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setProcessedImage(null);
        setSelectedPresetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = () => {
    if (!selectedPresetId || !uploadedImage || remainingProcesses <= 0) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedImage(uploadedImage);
      setIsProcessing(false);
      if (onProcessComplete) {
        onProcessComplete();
      }
    }, 2000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setProcessedImage(null);
    setSelectedPresetId(null);
    setIsProcessing(false);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto animate-float">
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
        
        <div className="bg-background rounded-[2.5rem] overflow-hidden h-[600px] flex flex-col">
          <div className="bg-card p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">PresetPro</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Zap" size={14} className="text-primary" />
                <span>{remainingProcesses} осталось</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!uploadedImage && !processedImage && (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Icon name="Image" size={48} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-center">Загрузи фото</h4>
                <p className="text-sm text-muted-foreground text-center px-4">
                  Выбери изображение и примени профессиональный пресет
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Icon name="Upload" size={18} />
                    Выбрать фото
                  </div>
                </label>
              </div>
            )}

            {uploadedImage && !processedImage && (
              <div className="space-y-4 animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-64 object-cover" />
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Выбери стиль</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {presets.map((preset, index) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPresetId(preset.id)}
                        className={`p-3 rounded-xl bg-gradient-to-br ${getPresetGradient(index)} hover:scale-105 transition-transform duration-200 text-white text-xs font-medium flex flex-col items-center gap-1 ${
                          selectedPresetId === preset.id ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                        }`}
                      >
                        <Icon name={getPresetIcon(index) as any} size={20} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleProcess}
                  disabled={!selectedPresetId || isProcessing || remainingProcesses <= 0}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                      Обработка...
                    </>
                  ) : remainingProcesses <= 0 ? (
                    'Лимит исчерпан'
                  ) : (
                    <>
                      <Icon name="Wand2" className="mr-2" size={16} />
                      Применить
                    </>
                  )}
                </Button>
              </div>
            )}

            {processedImage && (
              <div className="space-y-4 animate-scale-in">
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={processedImage} alt="Processed" className="w-full h-64 object-cover" />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-xs font-medium">
                    ✨ Обработано
                  </div>
                </div>

                <div className="bg-card/50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Стиль:</span>
                    <span className="font-semibold capitalize">{presets.find(p => p.id === selectedPresetId)?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Осталось:</span>
                    <span className="font-semibold text-primary">{remainingProcesses} обработок</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleReset} className="w-full">
                    <Icon name="RotateCcw" className="mr-2" size={16} />
                    Новое фото
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Download" className="mr-2" size={16} />
                    Скачать
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;