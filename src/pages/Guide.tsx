import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface DayPlanItem {
  time: string;
  title: string;
  description: string;
  icon: string;
  location: string;
  mapLink: string;
}

interface RouteItem {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
}

interface TipItem {
  category: string;
  icon: string;
  tips: string[];
}

const threeDayPlan: { [key: string]: DayPlanItem[] } = {
  day1: [
    {
      time: '09:00',
      title: 'Завтрак в центре',
      description: 'Начните день с завтрака в одном из кафе на Навагинской улице',
      icon: 'Coffee',
      location: 'Навагинская улица',
      mapLink: 'https://yandex.ru/maps/-/CLVLBAK2'
    },
    {
      time: '10:30',
      title: 'Парк Ривьера',
      description: 'Прогулка по старейшему парку Сочи, дельфинарий, аттракционы',
      icon: 'Trees',
      location: 'Парк Ривьера',
      mapLink: 'https://yandex.ru/maps/239/sochi/?ll=39.715878%2C43.592055&mode=poi&poi%5Bpoint%5D=39.715872%2C43.591399&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1105456640&z=17'
    },
    {
      time: '14:00',
      title: 'Обед у моря',
      description: 'Мидии и морепродукты в ресторане "Мидийное место"',
      icon: 'UtensilsCrossed',
      location: 'Мидийное место',
      mapLink: 'https://yandex.ru/maps/239/sochi/chain/midijnoe_mesto/150461476458/'
    },
    {
      time: '16:00',
      title: 'Пляж и набережная',
      description: 'Отдых на пляже, прогулка по набережной до Морского вокзала',
      icon: 'Waves',
      location: 'Центральная набережная',
      mapLink: 'https://yandex.ru/maps/-/CLVH6Hoj'
    },
    {
      time: '20:00',
      title: 'Ужин с видом',
      description: 'Ресторан D.O.M в порту с панорамным видом на море',
      icon: 'Utensils',
      location: 'D.O.M',
      mapLink: 'https://yandex.ru/maps/-/CLVH6Hoj'
    }
  ],
  day2: [
    {
      time: '08:00',
      title: 'Ранний выезд в горы',
      description: 'Поездка на Роза Хутор или Красную Поляну',
      icon: 'Mountain',
      location: 'Роза Хутор',
      mapLink: 'https://yandex.ru/maps/org/roza_khutor/210727341098/'
    },
    {
      time: '10:00',
      title: 'Канатная дорога',
      description: 'Подъем на высоту 2320м, панорамные виды на горы',
      icon: 'Cable',
      location: 'Канатная дорога Роза Хутор',
      mapLink: 'https://yandex.ru/maps/org/roza_khutor/210727341098/'
    },
    {
      time: '13:00',
      title: 'Обед в горах',
      description: 'Грузинская кухня в ресторане на высоте',
      icon: 'UtensilsCrossed',
      location: 'Ресторан Роза Хутор',
      mapLink: 'https://rosakhutor.ru/'
    },
    {
      time: '15:00',
      title: 'Прогулка по курорту',
      description: 'Исследуйте инфраструктуру курорта, магазины, смотровые площадки',
      icon: 'Camera',
      location: 'Роза Хутор',
      mapLink: 'https://rosakhutor.ru/'
    },
    {
      time: '18:00',
      title: 'Возвращение в Сочи',
      description: 'Поездка обратно в город (40-50 минут)',
      icon: 'Car',
      location: 'Дорога в Сочи',
      mapLink: 'https://yandex.ru/maps/'
    }
  ],
  day3: [
    {
      time: '09:30',
      title: 'Skypark',
      description: 'Парк приключений: подвесной мост, зиплайн, качели',
      icon: 'Zap',
      location: 'Skypark Сочи',
      mapLink: 'https://yandex.ru/maps/org/skaypark/1210593378/'
    },
    {
      time: '13:00',
      title: 'Обед в Skypark',
      description: 'Кафе на территории парка с видом на ущелье',
      icon: 'Coffee',
      location: 'Skypark',
      mapLink: 'https://skypark.ru/'
    },
    {
      time: '15:00',
      title: 'Тисо-самшитовая роща',
      description: 'Прогулка по реликтовому лесу возрастом 30 млн лет',
      icon: 'TreePine',
      location: 'Хостинская роща',
      mapLink: 'https://yandex.ru/maps/org/tiso_samshitovaya_roshcha/119220728731/'
    },
    {
      time: '18:00',
      title: 'Чайные плантации',
      description: 'Экскурсия по чайной фабрике, дегустация краснодарского чая',
      icon: 'Leaf',
      location: 'Мацестинская долина',
      mapLink: 'https://yandex.ru/maps/'
    },
    {
      time: '21:00',
      title: 'Ночная жизнь Сочи',
      description: 'Коктейли и живая музыка в баре "Закулисье"',
      icon: 'Music',
      location: 'Закулисье',
      mapLink: 'https://yandex.ru/maps/-/CLVLZALv'
    }
  ]
};

const routes: RouteItem[] = [
  {
    title: 'Центр Сочи за день',
    duration: '6-8 часов',
    description: 'Классический маршрут для первого знакомства с городом',
    highlights: [
      'Парк Ривьера и дельфинарий',
      'Набережная и Морской вокзал',
      'Навагинская улица (пешеходная)',
      'Зимний театр',
      'Сочинский художественный музей'
    ],
    difficulty: 'easy',
    image: 'https://cdn.poehali.dev/projects/5f21fc14-32b8-4315-81a1-36ef6151fc35/files/bb7b8306-9b89-47ac-a5d3-633a07924396.jpg'
  },
  {
    title: 'Горная Красная Поляна',
    duration: 'Полный день',
    description: 'Путешествие в горы с канатными дорогами и панорамами',
    highlights: [
      'Роза Хутор (подъем на 2320м)',
      'Горки Город',
      'Смотровые площадки',
      'Водопад "Менделиха"',
      'Ресторан с видом на горы'
    ],
    difficulty: 'medium',
    image: 'https://tripplanet.ru/wp-content/uploads/europe/russia/rosa-khutor/dostoprimechatelnosti-roza-hutora.jpg'
  },
  {
    title: 'Природа и приключения',
    duration: '8-10 часов',
    description: 'Для активных туристов: горы, водопады, экстрим',
    highlights: [
      'Skypark (качели, зиплайн)',
      'Каньон реки Хоста',
      'Тисо-самшитовая роща',
      'Агурские водопады',
      'Гора Ахун и башня'
    ],
    difficulty: 'hard',
    image: 'https://cdn.poehali.dev/files/190fc5af-ac2c-43dc-aa74-a702f2194cea.png'
  },
  {
    title: 'Олимпийское наследие',
    duration: '4-5 часов',
    description: 'Объекты Олимпиады 2014 и современные достопримечательности',
    highlights: [
      'Олимпийский парк',
      'Поющие фонтаны',
      'Стадион "Фишт"',
      'Олимпийская деревня',
      'Сочи Парк (русский Диснейленд)'
    ],
    difficulty: 'easy',
    image: 'https://cdn.poehali.dev/files/8eae2dcd-fa08-4372-ad2a-a538ee064b66.png'
  }
];

const tips: TipItem[] = [
  {
    category: 'Транспорт',
    icon: 'Bus',
    tips: [
      'Такси: Яндекс.Такси, Uber работают по всему городу',
      'Электрички "Ласточка" до Красной Поляны (~50 мин, 400₽)',
      'Автобусы №105, 105с до Красной Поляны',
      'Прокат авто от 1500₽/день (нужен опыт горных дорог)',
      'Единая транспортная карта "Тройка Сочи"'
    ]
  },
  {
    category: 'Когда ехать',
    icon: 'Calendar',
    tips: [
      'Лето (июнь-сентябрь): пляжный сезон, +25-30°C',
      'Зима (декабрь-март): горные лыжи в Красной Поляне',
      'Осень (октябрь-ноябрь): низкий сезон, меньше туристов',
      'Весна (апрель-май): цветение, комфортная погода',
      'Избегайте июль-август: пик сезона, высокие цены'
    ]
  },
  {
    category: 'Деньги',
    icon: 'Wallet',
    tips: [
      'Средний чек в ресторане: 1000-1500₽',
      'Жилье от 2000₽/ночь летом',
      'Входной билет в парки: 300-2500₽',
      'Канатная дорога: 1000-2500₽',
      'Везде принимают карты, наличные не обязательны'
    ]
  },
  {
    category: 'Безопасность',
    icon: 'Shield',
    tips: [
      'Пейте только бутилированную воду',
      'В горах обязательны: крем от солнца, тёплая одежда',
      'Для пляжа: защита SPF 50+, головной убор',
      'Остерегайтесь змей в Тисо-самшитовой роще',
      'Медузы в море обычно безопасны, но могут жечь'
    ]
  },
  {
    category: 'Связь и интернет',
    icon: 'Wifi',
    tips: [
      'Wi-Fi есть во всех отелях и большинстве кафе',
      'Мобильная связь работает везде (даже в горах)',
      'Купите местную SIM-карту для интернета',
      'В Красной Поляне интернет может быть медленным',
      'Скачайте офлайн-карты Яндекс.Карты'
    ]
  },
  {
    category: 'Что взять с собой',
    icon: 'Backpack',
    tips: [
      'Летом: купальник, солнцезащитные очки, сандалии',
      'Зимой: термобельё, горнолыжная одежда',
      'Круглый год: удобная обувь для прогулок',
      'Дождевик (погода переменчивая)',
      'Репелленты от комаров (вечером у моря)'
    ]
  }
];

export default function Guide() {
  const [selectedDay, setSelectedDay] = useState('day1');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            Путеводитель по Сочи
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Маршруты, советы и планы на 3 дня для идеального отдыха
          </p>
        </div>

        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://cdn.poehali.dev/projects/5f21fc14-32b8-4315-81a1-36ef6151fc35/files/bb7b8306-9b89-47ac-a5d3-633a07924396.jpg"
            alt="Путеводитель по Сочи"
            className="w-full h-[400px] object-cover"
          />
        </div>

        <Tabs defaultValue="plan" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto h-auto p-1">
            <TabsTrigger value="plan" className="text-sm md:text-base py-3">
              <Icon name="Calendar" size={18} className="mr-2" />
              План на 3 дня
            </TabsTrigger>
            <TabsTrigger value="routes" className="text-sm md:text-base py-3">
              <Icon name="Map" size={18} className="mr-2" />
              Маршруты
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-sm md:text-base py-3">
              <Icon name="Lightbulb" size={18} className="mr-2" />
              Советы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-8">
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                variant={selectedDay === 'day1' ? 'default' : 'outline'}
                onClick={() => setSelectedDay('day1')}
                className="px-8"
              >
                День 1
              </Button>
              <Button
                variant={selectedDay === 'day2' ? 'default' : 'outline'}
                onClick={() => setSelectedDay('day2')}
                className="px-8"
              >
                День 2
              </Button>
              <Button
                variant={selectedDay === 'day3' ? 'default' : 'outline'}
                onClick={() => setSelectedDay('day3')}
                className="px-8"
              >
                День 3
              </Button>
            </div>

            <div className="space-y-6">
              {threeDayPlan[selectedDay].map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name={item.icon} size={28} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {item.time}
                          </span>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="MapPin" size={16} className="text-accent" />
                          <a 
                            href={item.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                          >
                            {item.location}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {routes.map((route, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={route.image}
                      alt={route.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{route.title}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        route.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        route.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {route.difficulty === 'easy' ? 'Легко' : 
                         route.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      {route.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{route.description}</p>
                    <div className="space-y-2">
                      {route.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tipGroup, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name={tipGroup.icon} size={24} className="text-primary" />
                      </div>
                      <CardTitle className="text-xl">{tipGroup.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tipGroup.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon name="ChevronRight" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
              <CardContent className="p-8 text-center">
                <Icon name="Heart" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Наслаждайтесь отдыхом!</h3>
                <p className="text-muted-foreground">
                  Сочи — это город контрастов, где море встречается с горами, 
                  а пляжный отдых сочетается с горнолыжными курортами. 
                  Используйте этот путеводитель как основу и создавайте свои собственные маршруты!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/'}
            className="px-8"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
}
