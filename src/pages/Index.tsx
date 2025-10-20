import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface AccommodationItem {
  name: string;
  description: string;
  rating: number;
  stars?: number;
  price: string;
  website: string;
  mapLink: string;
  image: string;
}

interface RestaurantItem {
  name: string;
  description: string;
  rating: number;
  averageCheck: string;
  phone: string;
  mapLink: string;
  image: string;
}

interface NightlifeItem {
  name: string;
  description: string;
  rating: number;
  openUntil: string;
  mapLink: string;
  image: string;
}

const accommodations: AccommodationItem[] = [
  {
    name: 'Архитектор by Provence',
    description: 'Современный апарт-отель в самом сердце Сочи',
    rating: 5.0,
    price: 'от 4600 ₽',
    website: 'https://architector-hotel.ru/booking/?utm_campaign=home_site&utm_medium=referral&utm',
    mapLink: 'https://yandex.ru/maps/-/CLVPiQ7i',
    image: 'https://avatars.mds.yandex.net/get-altay/14402904/2a00000191c6576d60ff65d4bd18f12ae132/XXXL'
  },
  {
    name: 'Marina Yacht by Stellar Hotels',
    description: 'Отель на берегу живописной бухты',
    rating: 4.7,
    stars: 4,
    price: 'от 6000 ₽',
    website: 'https://www.marinayacht.ru/?yclid=8763201098709729279&utm_content=16085296057&utm',
    mapLink: 'https://yandex.ru/maps/-/CLVPmWYc',
    image: 'https://avatars.mds.yandex.net/get-altay/240733/2a00000187d37ca2f5267412ca0f86ee44c5/XXXL'
  },
  {
    name: 'РП Манхэттен',
    description: 'Отель в центре Сочи',
    rating: 4.7,
    price: 'от 3700 ₽',
    website: 'ranovskypark.ru',
    mapLink: 'https://yandex.ru/maps/-/CLVPuV4K',
    image: 'https://avatars.mds.yandex.net/get-altay/15629777/2a00000199ecda82118c0f6a15eeb09241bb/XXXL'
  },
  {
    name: 'Portofino',
    description: 'Гостиница на первой береговой линии',
    rating: 4.4,
    price: 'от 4500 ₽',
    website: 'hotelportofino.ru',
    mapLink: 'https://yandex.ru/maps/-/CLVPFZ3O',
    image: 'https://avatars.mds.yandex.net/get-altay/14171651/2a00000191c1b762ac940651766af61ea399/XXXL'
  },
  {
    name: 'Жемчужина',
    description: 'Отель с собственным пляжем и теорией',
    rating: 4.7,
    stars: 4,
    price: 'от 9000 ₽',
    website: '8 (800) 200-12-88',
    mapLink: 'https://yandex.ru/maps/-/CLVPFLmH',
    image: 'https://avatars.mds.yandex.net/get-altay/1001354/2a00000162c166d1975ecd66843ac755d11a/XXXL'
  },
  {
    name: 'Solar by Stellar Hotels',
    description: 'Гостиница в Красной поляне с прямыми автобусами до горнолыжных курортов',
    rating: 5.0,
    price: 'от 4700 ₽',
    website: 'https://solar-stellarhotels.ru/?yclid=9386087096949407743&utm_content=16085296046&utm_source=geoadv_maps',
    mapLink: 'https://yandex.ru/maps/-/CLVPjEJW',
    image: 'https://avatars.mds.yandex.net/get-altay/1003687/2a000001865a6b6fa81f342157610c21114b/XXXL'
  },
  {
    name: 'Риксос Красная поляна Сочи',
    description: 'Отель, расположенный на высоте 960 метров над уровнем моря.',
    rating: 5.0,
    stars: 5,
    price: 'от 24000 ₽',
    website: 'https://krasnayapolyanaresort.ru/',
    mapLink: 'https://yandex.ru/maps/-/CLVPjV8P',
    image: 'https://avatars.mds.yandex.net/get-altay/224414/2a000001615745f902799e81ef4b00fe3f2c/XXXL'
  },
  {
    name: 'Апартаменты курорта Красная поляна',
    description: 'Простые и уютные номера с видом на горы',
    rating: 5.0,
    price: 'от 3900 ₽',
    website: 'https://yandex.ru/maps/-/CLVPrU4R',
    mapLink: 'https://yandex.ru/maps/-/CLVPrU4R',
    image: 'https://avatars.mds.yandex.net/get-altay/2809325/2a000001705aa6430547087e74938b3c0b88/XXXL'
  }
];

const restaurants: RestaurantItem[] = [
  {
    name: 'Медийное место',
    description: 'Сеть ресторанов на берегу моря с мидиями',
    rating: 5.0,
    averageCheck: '700 - 1000 ₽',
    phone: '+7 (908) 541-34-79',
    mapLink: 'https://yandex.ru/maps/239/sochi/chain/midijnoe_mesto/150461476458/?ll=39.728972%2C43.576739&sctx=ZAAAAAgBEAAaKAoSCTvFqkGY3UNAEUccsoF0yUVAEhIJeCY0SSwphz8RVRfwMsNGeT8iBgABAgMEBSgKOABA8YAHSAFqAnJ1nQHNzMw9oAEAqAEAvQGdBuKbwgEY96PYhNAGlcTMkO8CxuzF%2F6cBqovele8FggIbKChjaGFpbl9pZDooMTUwNDYxNDc2NDU4KSkpigIAkgIAmgIMZGVza3RvcC1tYXBzqgIMMTUwNDYxNDc2NDU4sAIB&sll=39.728972%2C43.576739&sspn=0.034762%2C0.018967&z=15.23',
    image: 'https://avatars.mds.yandex.net/get-tycoon/18880477/2a00000199c86ab3a56ea46418938d3e0431/priority-headline-background'
  },
  {
    name: 'D.O.M',
    description: 'Четырехэтажный ресторанный комплекс в порту',
    rating: 4.9,
    averageCheck: 'от 1500 ₽',
    phone: '+7 (901) 494-89-74',
    mapLink: 'https://yandex.ru/maps/-/CLVH6Hoj',
    image: 'https://avatars.mds.yandex.net/get-altay/14675673/2a0000019680ed5b425a95c2d99d1e543e2f/XXXL'
  },
  {
    name: 'Мамино',
    description: 'Семейный ресторан с кавказской кухней',
    rating: 5.0,
    averageCheck: '1000-1500 ₽',
    phone: '+7 (988) 239-34-44',
    mapLink: 'https://yandex.ru/maps/-/CLVHrVi3',
    image: 'https://avatars.mds.yandex.net/get-altay/16418365/2a00000197ef264ba0dbcf0de8eeb1c1bf22/XXXL'
  },
  {
    name: 'Оливье',
    description: 'Домашняя русская кухня',
    rating: 5.0,
    averageCheck: '1200-1700 ₽',
    phone: '+7 (965) 457-46-17',
    mapLink: 'https://yandex.ru/maps/-/CLVLMQmh',
    image: 'https://avatars.mds.yandex.net/get-altay/771751/2a000001608b9ff6f672f6b3e7c8bbc40f02/XXXL'
  },
  {
    name: 'Баран-Рапан',
    description: 'Черноморская кухня',
    rating: 5.0,
    averageCheck: '3500 ₽',
    phone: '+7 (995) 225-50-25',
    mapLink: 'https://yandex.ru/maps/-/CLVLQSPB',
    image: 'https://avatars.mds.yandex.net/get-altay/14010724/2a0000019301af52e760017d32dab8aac86b/XXXL'
  },
  {
    name: 'Птицы захмелели',
    description: 'Блюда из птиц с видом на горы',
    rating: 5.0,
    averageCheck: '2000-5000 ₽',
    phone: '+7 (938) 446-68-88',
    mapLink: 'https://yandex.ru/maps/-/CLVLeZ2H',
    image: 'https://avatars.mds.yandex.net/get-altay/10228783/2a00000192ce323f18dfee8ef12bd80023c2/XXXL'
  },
  {
    name: 'Столовая зарянка',
    description: 'Вкусно и сытно по доступным ценам',
    rating: 5.0,
    averageCheck: '400 ₽',
    phone: '+7 (928) 234-10-45',
    mapLink: 'https://yandex.ru/maps/-/CLVLqQ6J',
    image: 'https://avatars.mds.yandex.net/get-altay/16634215/2a000001991601bb417b20857b2c717c9724/XXXL'
  },
  {
    name: 'Каштан',
    description: 'Европейская и грузинская кухня, блюда из каштана с видом на горы',
    rating: 4.9,
    averageCheck: 'от 1500 ₽',
    phone: '+7 (928) 233-03-13',
    mapLink: 'https://yandex.ru/maps/-/CLVLuNKG',
    image: 'https://avatars.mds.yandex.net/get-altay/14014620/2a00000192875f537cf974db57486724b2f4/XXXL'
  }
];

const nightlife: NightlifeItem[] = [
  {
    name: 'HookahPlace Crystal',
    description: 'Кальян-бар на высоте 960 метров над уровнем моря',
    rating: 5.0,
    openUntil: '01:00',
    mapLink: 'https://yandex.ru/maps/-/CLVLBAK2',
    image: 'https://avatars.mds.yandex.net/get-altay/14578051/2a00000194d6963815ee49ee400c622677d3/XXXL'
  },
  {
    name: 'Nebar',
    description: 'Ночной клуб',
    rating: 5.0,
    openUntil: '08:00',
    mapLink: 'https://yandex.ru/maps/-/CLVLVOP~',
    image: 'https://avatars.mds.yandex.net/get-altay/11374564/2a0000019200d1347f32c667d20613fb8bb5/XXXL'
  },
  {
    name: 'Закулисье',
    description: 'Бар с живой музыкой и культурными мероприятиями',
    rating: 5.0,
    openUntil: '03:00',
    mapLink: 'https://yandex.ru/maps/-/CLVLZALv',
    image: 'https://avatars.mds.yandex.net/get-altay/15389647/2a00000198c95a5a02f60ce46b4f645c2893/XXXL'
  },
  {
    name: 'Макгрегорс Паб',
    description: 'Ирландский паб, спортбар',
    rating: 4.9,
    openUntil: '04:00',
    mapLink: 'https://yandex.ru/maps/-/CLVL64zS',
    image: 'https://avatars.mds.yandex.net/get-altay/15434262/2a0000019718706d6225d9ccaacdb4a821ff/XXXL'
  },
  {
    name: 'Bestuzhev Bar',
    description: 'Бар, паб, ночной клуб и караоке-клуб в одном месте',
    rating: 5.0,
    openUntil: '06:00',
    mapLink: 'https://yandex.ru/maps/-/CLVLbP0R',
    image: 'https://avatars.mds.yandex.net/get-altay/4324073/2a0000017a0a598975afb866599178c2ef4d/XXXL'
  },
  {
    name: 'Pascal Lounge',
    description: 'Кальян бар с настольными играми',
    rating: 5.0,
    openUntil: '06:00',
    mapLink: 'https://yandex.ru/maps/-/CLVLz898',
    image: 'https://avatars.mds.yandex.net/get-altay/6550540/2a00000188b5668be12f7371282a7e4d8a7d/XXXL'
  }
];

const Index = () => {
  const [bookingDialog, setBookingDialog] = useState<{ open: boolean; type: 'accommodation' | 'restaurant' | null; data: string }>({
    open: false,
    type: null,
    data: ''
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4">
            Путеводитель по Сочи
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя лучшие места для отдыха, гастрономии и развлечений
          </p>
        </header>

        <Tabs defaultValue="accommodation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm p-1 h-auto">
            <TabsTrigger value="accommodation" className="flex items-center gap-2 py-3 text-sm md:text-base">
              <Icon name="Home" size={20} />
              <span className="hidden sm:inline">Проживание</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center gap-2 py-3 text-sm md:text-base">
              <Icon name="UtensilsCrossed" size={20} />
              <span className="hidden sm:inline">Рестораны</span>
            </TabsTrigger>
            <TabsTrigger value="nightlife" className="flex items-center gap-2 py-3 text-sm md:text-base">
              <Icon name="Music" size={20} />
              <span className="hidden sm:inline">Ночная жизнь</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accommodation" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-sm">{item.rating}</span>
                      {item.stars && (
                        <div className="flex ml-1">
                          {Array.from({ length: item.stars }).map((_, i) => (
                            <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full font-semibold text-sm shadow-md">
                      {item.price}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(item.mapLink, '_blank')}
                      >
                        <Icon name="MapPin" size={16} className="mr-1" />
                        На карте
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => setBookingDialog({ open: true, type: 'accommodation', data: item.website })}
                      >
                        <Icon name="ExternalLink" size={16} className="mr-1" />
                        Забронировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-sm">{item.rating}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full font-semibold text-sm shadow-md">
                      {item.averageCheck}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(item.mapLink, '_blank')}
                      >
                        <Icon name="MapPin" size={16} className="mr-1" />
                        На карте
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => setBookingDialog({ open: true, type: 'restaurant', data: item.phone })}
                      >
                        <Icon name="Phone" size={16} className="mr-1" />
                        Забронировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nightlife" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nightlife.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-sm">{item.rating}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full font-semibold text-sm shadow-md flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      до {item.openUntil}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(item.mapLink, '_blank')}
                    >
                      <Icon name="MapPin" size={16} className="mr-2" />
                      Открыть на карте
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={bookingDialog.open} onOpenChange={(open) => setBookingDialog({ ...bookingDialog, open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {bookingDialog.type === 'accommodation' ? 'Бронирование проживания' : 'Бронирование столика'}
            </DialogTitle>
            <DialogDescription>
              {bookingDialog.type === 'accommodation' 
                ? 'Перейдите по ссылке для бронирования' 
                : 'Позвоните по номеру для бронирования'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 bg-secondary/50 p-4 rounded-lg">
            <div className="flex-1 text-sm break-all">
              {bookingDialog.type === 'accommodation' ? (
                <a href={bookingDialog.data} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {bookingDialog.data}
                </a>
              ) : (
                <a href={`tel:${bookingDialog.data.replace(/[^+\d]/g, '')}`} className="text-primary hover:underline font-semibold text-lg">
                  {bookingDialog.data}
                </a>
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              if (bookingDialog.type === 'accommodation') {
                window.open(bookingDialog.data, '_blank');
              } else {
                window.location.href = `tel:${bookingDialog.data.replace(/[^+\d]/g, '')}`;
              }
              setBookingDialog({ ...bookingDialog, open: false });
            }}
            className="w-full"
          >
            <Icon name={bookingDialog.type === 'accommodation' ? 'ExternalLink' : 'Phone'} size={16} className="mr-2" />
            {bookingDialog.type === 'accommodation' ? 'Перейти на сайт' : 'Позвонить'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
