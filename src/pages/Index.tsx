import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PhoneDemo from '@/components/PhoneDemo';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [remainingProcesses, setRemainingProcesses] = useState(3);

  const handleProcessComplete = () => {
    setRemainingProcesses(prev => Math.max(0, prev - 1));
  };

  const presets = [
    { id: 1, name: 'Cinematic', price: '₽990', category: 'Профессиональные', description: 'Кинематографичные цвета и драматичный контраст' },
    { id: 2, name: 'Sunset Glow', price: '₽790', category: 'Тёплые', description: 'Мягкие закатные оттенки для романтичных фото' },
    { id: 3, name: 'Urban Dark', price: '₽1190', category: 'Профессиональные', description: 'Урбанистичный стиль с глубокими тенями' },
    { id: 4, name: 'Pastel Dream', price: '₽690', category: 'Нежные', description: 'Пастельные тона для нежных и воздушных снимков' },
    { id: 5, name: 'Vintage Film', price: '₽890', category: 'Ретро', description: 'Эффект плёночной фотографии с зерном' },
    { id: 6, name: 'Moody Blues', price: '₽990', category: 'Профессиональные', description: 'Холодные синие тона для драматичных портретов' },
  ];

  const gallery = [
    { id: 1, before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', after: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', preset: 'Cinematic' },
    { id: 2, before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', after: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e', preset: 'Sunset Glow' },
    { id: 3, before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', after: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', preset: 'Urban Dark' },
    { id: 4, before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', after: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df', preset: 'Pastel Dream' },
  ];

  const styles = [
    { id: 1, name: 'Cinematic', icon: 'Film', color: 'from-purple-500 to-pink-500' },
    { id: 2, name: 'Vintage', icon: 'Camera', color: 'from-amber-500 to-orange-500' },
    { id: 3, name: 'Moody', icon: 'Moon', color: 'from-blue-500 to-indigo-500' },
    { id: 4, name: 'Bright', icon: 'Sun', color: 'from-yellow-500 to-pink-500' },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">PresetPro</div>
          <div className="hidden md:flex gap-8">
            {['home', 'gallery', 'editor', 'presets', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="capitalize hover:text-primary transition-colors"
              >
                {section === 'home' ? 'Главная' : section === 'gallery' ? 'Галерея' : section === 'editor' ? 'Редактор' : section === 'presets' ? 'Пресеты' : 'Контакты'}
              </button>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            Купить пресеты
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Превращай фото в <span className="gradient-text">шедевры</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональные пресеты и онлайн-редактор для идеальных снимков за несколько кликов
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Попробовать редактор
                </Button>
                <Button size="lg" variant="outline" className="border-2">
                  Смотреть галерею
                </Button>
              </div>
            </div>
            <div className="relative">
              <PhoneDemo 
                remainingProcesses={remainingProcesses}
                onProcessComplete={handleProcessComplete}
              />
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                  <Icon name="Gift" size={16} className="text-primary" />
                  <span className="text-sm font-medium">
                    {remainingProcesses > 0 ? `${remainingProcesses} бесплатных обработки` : 'Бесплатные закончились'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея работ</h2>
            <p className="text-xl text-muted-foreground">До и после применения наших пресетов</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {gallery.map((item) => (
              <Card key={item.id} className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300 gradient-border">
                <CardContent className="p-0 relative">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={item.before} alt="Before" className="w-full h-64 object-cover grayscale" />
                      <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm">До</div>
                    </div>
                    <div className="relative">
                      <img src={item.after} alt="After" className="w-full h-64 object-cover" />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-sm">После</div>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <p className="text-sm text-muted-foreground">Пресет: <span className="text-primary font-medium">{item.preset}</span></p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="editor" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Онлайн редактор</h2>
            <p className="text-xl text-muted-foreground">Загрузи фото, выбери стиль — получи результат мгновенно</p>
          </div>
          <Card className="max-w-4xl mx-auto gradient-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Загрузи своё фото</p>
                    <p className="text-sm text-muted-foreground">или перетащи файл сюда</p>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Поддержка JPG, PNG до 10MB</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Выбери стиль</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        className={`p-4 rounded-xl bg-gradient-to-br ${style.color} hover:scale-105 transition-transform duration-200 text-white font-medium flex flex-col items-center gap-2`}
                      >
                        <Icon name={style.icon as any} size={32} />
                        <span>{style.name}</span>
                      </button>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 mt-4">
                    <Icon name="Wand2" className="mr-2" size={20} />
                    Применить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="presets" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог пресетов</h2>
            <p className="text-xl text-muted-foreground">Выбирай из коллекции профессиональных пресетов</p>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="pro">Профи</TabsTrigger>
              <TabsTrigger value="warm">Тёплые</TabsTrigger>
              <TabsTrigger value="retro">Ретро</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid md:grid-cols-3 gap-6">
                {presets.map((preset) => (
                  <Card key={preset.id} className="overflow-hidden hover:scale-105 transition-transform duration-300 gradient-border">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Image" size={64} className="text-muted-foreground" />
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{preset.name}</h3>
                        <span className="text-2xl font-bold text-primary">{preset.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="ShoppingCart" className="mr-2" size={16} />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pro">
              <div className="grid md:grid-cols-3 gap-6">
                {presets.filter(p => p.category === 'Профессиональные').map((preset) => (
                  <Card key={preset.id} className="overflow-hidden hover:scale-105 transition-transform duration-300 gradient-border">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Image" size={64} className="text-muted-foreground" />
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{preset.name}</h3>
                        <span className="text-2xl font-bold text-primary">{preset.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="ShoppingCart" className="mr-2" size={16} />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="warm">
              <div className="grid md:grid-cols-3 gap-6">
                {presets.filter(p => p.category === 'Тёплые').map((preset) => (
                  <Card key={preset.id} className="overflow-hidden hover:scale-105 transition-transform duration-300 gradient-border">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Image" size={64} className="text-muted-foreground" />
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{preset.name}</h3>
                        <span className="text-2xl font-bold text-primary">{preset.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="ShoppingCart" className="mr-2" size={16} />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="retro">
              <div className="grid md:grid-cols-3 gap-6">
                {presets.filter(p => p.category === 'Ретро').map((preset) => (
                  <Card key={preset.id} className="overflow-hidden hover:scale-105 transition-transform duration-300 gradient-border">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Image" size={64} className="text-muted-foreground" />
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{preset.name}</h3>
                        <span className="text-2xl font-bold text-primary">{preset.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="ShoppingCart" className="mr-2" size={16} />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Остались вопросы? Напиши нам!</p>
          </div>
          <Card className="gradient-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">support@presetpro.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telegram</h3>
                      <p className="text-muted-foreground">@presetpro_support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Instagram" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Instagram</h3>
                      <p className="text-muted-foreground">@presetpro.official</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Ваше сообщение"
                    rows={4}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Send" className="mr-2" size={16} />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 PresetPro. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;