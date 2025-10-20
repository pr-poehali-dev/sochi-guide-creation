import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  location: string;
}

interface Route {
  id: number;
  title: string;
  duration: string;
  description: string;
  stops: string[];
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const attractions: Attraction[] = [
    {
      id: 1,
      name: 'Олимпийский парк',
      description: 'Комплекс олимпийских объектов, построенных к Играм 2014 года',
      image: 'https://cdn.poehali.dev/files/olympic-park.jpg',
      category: 'landmarks',
      price: 'Бесплатно',
      location: 'Адлерский район'
    },
    {
      id: 2,
      name: 'Роза Хутор',
      description: 'Горнолыжный курорт мирового уровня',
      image: 'https://cdn.poehali.dev/files/rosa-khutor.jpg',
      category: 'nature',
      price: 'От 2500 ₽',
      location: 'Красная Поляна'
    },
    {
      id: 3,
      name: 'Дендрарий',
      description: 'Уникальный парк с редкими растениями со всего мира',
      image: 'https://cdn.poehali.dev/files/dendrarium.jpg',
      category: 'nature',
      price: '320 ₽',
      location: 'Центральный район'
    },
    {
      id: 4,
      name: 'Сочи Парк',
      description: 'Первый тематический парк развлечений в России',
      image: 'https://cdn.poehali.dev/files/sochi-park.jpg',
      category: 'entertainment',
      price: 'От 1800 ₽',
      location: 'Адлерский район'
    },
    {
      id: 5,
      name: 'Скайпарк',
      description: 'Парк приключений с самым длинным подвесным мостом',
      image: 'https://cdn.poehali.dev/files/skypark.jpg',
      category: 'entertainment',
      price: 'От 2500 ₽',
      location: 'Адлерский район'
    },
    {
      id: 6,
      name: 'Агурские водопады',
      description: 'Живописные водопады в ущелье реки Агура',
      image: 'https://cdn.poehali.dev/files/agura-waterfalls.jpg',
      category: 'nature',
      price: 'Бесплатно',
      location: 'Хостинский район'
    }
  ];

  const routes: Route[] = [
    {
      id: 1,
      title: 'Олимпийский маршрут',
      duration: '1 день',
      description: 'Познакомьтесь с наследием Олимпиады 2014',
      stops: ['Олимпийский парк', 'Фонтаны', 'Сочи Парк', 'Набережная Имеретинская']
    },
    {
      id: 2,
      title: 'Горы и водопады',
      duration: '1 день',
      description: 'Откройте природные красоты Сочи',
      stops: ['Роза Хутор', 'Водопады Менделиха', 'Панорамная площадка 2320', 'Красная Поляна']
    },
    {
      id: 3,
      title: 'Центр Сочи',
      duration: '4-5 часов',
      description: 'Прогулка по историческому центру города',
      stops: ['Морской вокзал', 'Набережная', 'Дендрарий', 'Парк Ривьера']
    }
  ];

  const filteredAttractions = selectedCategory === 'all' 
    ? attractions 
    : attractions.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Palmtree" size={32} className="text-orange-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Путеводитель по Сочи
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#attractions" className="text-gray-700 hover:text-blue-600 transition">Достопримечательности</a>
              <a href="#routes" className="text-gray-700 hover:text-blue-600 transition">Маршруты</a>
              <a href="#info" className="text-gray-700 hover:text-blue-600 transition">Полезное</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-orange-500/90 z-10"></div>
        <img 
          src="https://cdn.poehali.dev/files/37f9e7df-e7df-4c58-9cb7-8b4dd0db19d3.png" 
          alt="Сочи"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Откройте для себя Сочи
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Жемчужина Черного моря. Горы, море, развлечения и незабываемые впечатления
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Icon name="MapPin" size={20} className="mr-2" />
            Начать путешествие
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-20 relative z-30 mb-20">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6 text-center">
              <Icon name="Sun" size={40} className="mx-auto mb-3 text-orange-500" />
              <h3 className="text-3xl font-bold text-gray-800">300+</h3>
              <p className="text-gray-600">солнечных дней</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6 text-center">
              <Icon name="Mountain" size={40} className="mx-auto mb-3 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-800">3000м</h3>
              <p className="text-gray-600">высота гор</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6 text-center">
              <Icon name="Waves" size={40} className="mx-auto mb-3 text-cyan-500" />
              <h3 className="text-3xl font-bold text-gray-800">145км</h3>
              <p className="text-gray-600">береговая линия</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6 text-center">
              <Icon name="Users" size={40} className="mx-auto mb-3 text-green-600" />
              <h3 className="text-3xl font-bold text-gray-800">7 млн</h3>
              <p className="text-gray-600">туристов в год</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl font-bold text-center mb-4">Главные достопримечательности</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Выберите категорию и найдите идеальные места для посещения
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button 
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            <Icon name="Grid3x3" size={16} className="mr-2" />
            Все
          </Button>
          <Button 
            variant={selectedCategory === 'landmarks' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('landmarks')}
            className="rounded-full"
          >
            <Icon name="Landmark" size={16} className="mr-2" />
            Достопримечательности
          </Button>
          <Button 
            variant={selectedCategory === 'nature' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('nature')}
            className="rounded-full"
          >
            <Icon name="Trees" size={16} className="mr-2" />
            Природа
          </Button>
          <Button 
            variant={selectedCategory === 'entertainment' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('entertainment')}
            className="rounded-full"
          >
            <Icon name="PartyPopper" size={16} className="mr-2" />
            Развлечения
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map(attraction => (
            <Card key={attraction.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  {attraction.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                <p className="text-gray-600 mb-4">{attraction.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Icon name="MapPin" size={16} className="mr-1" />
                  {attraction.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Routes Section */}
      <section id="routes" className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 mb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Готовые маршруты</h2>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">
            Мы подготовили оптимальные маршруты для знакомства с городом
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {routes.map(route => (
              <Card key={route.id} className="bg-white hover:shadow-2xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Route" size={24} className="text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {route.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{route.title}</h3>
                  <p className="text-gray-600 mb-4">{route.description}</p>
                  <div className="space-y-2">
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="min-w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-gray-700">{stop}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">Полезная информация</h2>

        <Tabs defaultValue="weather" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weather">
              <Icon name="Cloud" size={16} className="mr-2" />
              Погода
            </TabsTrigger>
            <TabsTrigger value="transport">
              <Icon name="Train" size={16} className="mr-2" />
              Транспорт
            </TabsTrigger>
            <TabsTrigger value="tips">
              <Icon name="Lightbulb" size={16} className="mr-2" />
              Советы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weather" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Когда лучше ехать</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Sun" size={20} className="text-orange-500" />
                      Лето (июнь-сентябрь)
                    </h4>
                    <p className="text-gray-600 mb-2">Температура: +25...+32°C</p>
                    <p className="text-gray-600">Идеально для пляжного отдыха. Море теплое (+22...+26°C). Высокий сезон.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Snowflake" size={20} className="text-blue-500" />
                      Зима (декабрь-март)
                    </h4>
                    <p className="text-gray-600 mb-2">Температура: +5...+12°C в городе</p>
                    <p className="text-gray-600">Горнолыжный сезон в Красной Поляне. Мягкая зима в городе.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Flower" size={20} className="text-pink-500" />
                      Весна (апрель-май)
                    </h4>
                    <p className="text-gray-600 mb-2">Температура: +15...+22°C</p>
                    <p className="text-gray-600">Цветение, комфортная погода для прогулок. Море еще прохладное.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Leaf" size={20} className="text-amber-600" />
                      Осень (октябрь-ноябрь)
                    </h4>
                    <p className="text-gray-600 mb-2">Температура: +15...+23°C</p>
                    <p className="text-gray-600">Бархатный сезон. Море теплое, меньше туристов, доступные цены.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Как добраться и передвигаться</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Plane" size={20} className="text-blue-600" />
                      Самолетом
                    </h4>
                    <p className="text-gray-600">Аэропорт Сочи (Адлер) - 30 км от центра. Регулярные рейсы из всех крупных городов России.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Train" size={20} className="text-green-600" />
                      Поездом
                    </h4>
                    <p className="text-gray-600">Железнодорожный вокзал в центре города. Комфортабельные поезда из Москвы, Санкт-Петербурга и других городов.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Bus" size={20} className="text-orange-600" />
                      Общественный транспорт
                    </h4>
                    <p className="text-gray-600">Автобусы, маршрутки, электрички "Ласточка" (Адлер - Роза Хутор). Единая транспортная карта.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Icon name="Car" size={20} className="text-purple-600" />
                      Аренда авто
                    </h4>
                    <p className="text-gray-600">Удобно для поездок по окрестностям. Аренда от 1500 ₽/день. Парковки платные в центре.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Советы туристам</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Icon name="CheckCircle" size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Бронируйте жилье заранее</h4>
                      <p className="text-gray-600">Особенно в высокий сезон (июнь-август). Цены могут вырасти в 2-3 раза.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="CheckCircle" size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Удобная обувь обязательна</h4>
                      <p className="text-gray-600">Много прогулок по горам и паркам. Возьмите кроссовки для походов.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="CheckCircle" size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Покупайте билеты онлайн</h4>
                      <p className="text-gray-600">В популярные места (Скайпарк, Сочи Парк) можно сэкономить до 20% и избежать очередей.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="CheckCircle" size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Пробуйте местную кухню</h4>
                      <p className="text-gray-600">Хачапури, хинкали, шашлык - обязательно посетите грузинские и кавказские рестораны.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="CheckCircle" size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Изучите районы города</h4>
                      <p className="text-gray-600">Сочи растянут на 145 км. Центр, Адлер, Хоста, Красная Поляна - выберите удобную базу.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Palmtree" size={28} className="text-orange-500" />
                <h3 className="text-xl font-bold">Путеводитель по Сочи</h3>
              </div>
              <p className="text-gray-400">
                Ваш надежный помощник в планировании незабываемого отдыха на курорте
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Полезные ссылки</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">О Сочи</a></li>
                <li><a href="#attractions" className="hover:text-white transition">Достопримечательности</a></li>
                <li><a href="#routes" className="hover:text-white transition">Маршруты</a></li>
                <li><a href="#info" className="hover:text-white transition">Информация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>+7 (800) 555-35-35</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@sochi-guide.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>г. Сочи, Россия</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Путеводитель по Сочи. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
