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

interface AttractionItem {
  name: string;
  description: string;
  rating: number;
  price: number;
  website: string;
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

const attractions: AttractionItem[] = [
  {
    name: 'Парк «Ривьера»',
    description: 'Знаменитый парк «Ривьера», в переводе с итальянского «прибрежный», был заложен в далеком 1898 году и расположен на правом берегу реки Сочи. Кстати, Сочи как курорт начал развиваться именно с этого места. Скульптурная композиция перед Южным входом — настоящие часы в виде золотой жемчужины, лежащей в раскрытой створке раковины, давно стала визитной карточкой парка «Ривьера». За более чем вековую историю существования в парке собрана уникальная коллекция достопримечательностей. «Ривьера» –парк не только для отдыха, но и для развлечений. Это старейший парк аттракционов Сочи. Здесь Вы можете найти много ресторанов, кафе и даже дельфинарий.',
    rating: 4.6,
    price: 0,
    website: 'https://park-riviera.ru/',
    mapLink: 'https://yandex.ru/maps/239/sochi/?ll=39.715878%2C43.592055&mode=poi&poi%5Bpoint%5D=39.715872%2C43.591399&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1105456640&z=17',
    image: 'https://cdn.poehali.dev/files/8eae2dcd-fa08-4372-ad2a-a538ee064b66.png'
  },
  {
    name: 'Тисо-самшитовая роща',
    description: 'Эту рощу часто называют Хостинской, потому что она расположена недалеко от курортного посёлка Хоста на юго-восточном склоне горы Ахун. Ценность рощи в том, что она сохранилась нетронутой с доледниковых времён и служит естественным заповедником для ягодного тиса, колхидского самшита и ещё почти 70 редчайших пород деревьев и кустарников. Некоторые тисы достигают высоты 12-этажного дома. Самшит интересен своей сверхпрочной древесиной, такой тяжёлой, что тонет в воде, поэтому его называют «железным деревом». Через рощу тянется тропа-лабиринт, возникшая 20 млн лет назад в результате тектонического разлома. Узкие ходы среди обомшелых слоистых скал приводят посетителей к смотровой площадке, откуда открывается панорама Кавказских гор и видно, как пенится река Хоста на дне каньона.',
    rating: 5.0,
    price: 300,
    website: 'https://www.kavkazzapoved.ru/o-nas',
    mapLink: 'https://yandex.ru/maps/org/tiso_samshitovaya_roshcha/119220728731/?ll=39.873646%2C43.537583&z=14.37',
    image: 'https://cdn.poehali.dev/files/13389312-3783-4d98-87c4-f95c891c6ad8.png'
  },
  {
    name: 'Sky Park Сочи',
    description: 'Skypark находится в уникальной природной локации – Ахштырском ущелье Сочинского национального парка. Здесь вы прогуляетесь по самому длинному в России подвесному пешеходному мосту, который входит в топ-13 самых впечатляющих мостов мира по версии CNN, полетаете на самых высоких в мире качелях, сможете прыгнуть с самой высокой в России банджи-площадки, прокатиться на суперскоростном троллее и посмотреть на мир с высоты птичьего полёта, летая на Zipline. Skypark – парк уникальных впечатлений!',
    rating: 5.0,
    price: 2500,
    website: 'https://skypark.ru/',
    mapLink: 'https://yandex.ru/maps/org/skaypark/1210593378/?ll=39.997255%2C43.524942&z=16.26',
    image: 'https://cdn.poehali.dev/files/190fc5af-ac2c-43dc-aa74-a702f2194cea.png'
  },
  {
    name: 'Роза Хутор',
    description: '«Роза Хутор» — это круглогодичный горнолыжный курорт мирового уровня в Сочи, расположенный в долине реки Мзымта. Он известен своими живописными горными пейзажами, обширной инфраструктурой и разнообразными возможностями для отдыха как зимой, так и летом. Курорт располагает 94-105 км горнолыжных трасс всех уровней сложности, современными канатными дорогами, отелями, ресторанами и магазинами.',
    rating: 5.0,
    price: 2500,
    website: 'https://rosakhutor.ru/?utm_source=google.com&utm_medium=organic&utm_campaign=google.com&utm_referrer=google.com',
    mapLink: 'https://yandex.ru/maps/org/roza_khutor/210727341098/?ll=40.297544%2C43.671377&z=16.26',
    image: 'https://tripplanet.ru/wp-content/uploads/europe/russia/rosa-khutor/dostoprimechatelnosti-roza-hutora.jpg'
  },
  {
    name: 'Чайная плантация «Мацестинская Долина»',
    description: 'В Краснодарском крае несколько мест, где выращивают чай. Одно из них — чайные плантации в Мацестинской долине, которые считаются самыми северными в мире. Мацестинская чайная фабрика работает с 1947 года и сегодня выпускает более 100 наименований чая под разными брендами («Мацеста чай», Turshu`s). Любой желающий может попасть сюда на экскурсию — погулять по чайным полям, продегустировать разные сорта чая, узнать особенности выращивания и заваривания чайных листьев.',
    rating: 5.0,
    price: 650,
    website: 'https://www.matsestatea.ru/excursions/',
    mapLink: 'https://yandex.ru/maps/org/chaynaya_plantatsiya_matsesty/116815787783/?ll=39.900775%2C43.732805&z=9.96',
    image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/195739e0c05f4380f2c474504b3e6251/'
  },
  {
    name: 'Олимпийский парк с поющим фонтаном',
    description: 'Объекты, построенные к Олимпиаде-2014, находятся в Имеретинской низменности в Адлеровском районе Сочи. Сюда приходят, чтобы погулять, покататься на велосипедах и роликах, посмотреть на шоу светомузыкальных фонтанов и сфотографироваться. На территории парка находится «Сочи автодром» и музей автомобилей. В сами олимпийские объекты можно попасть, если купить билет на какое-то событие: спортивный матч, концерт, ледовое шоу и т.д.',
    rating: 5.0,
    price: 0,
    website: 'https://xn----8sbwaafbgebmvqgqj.xn--p1ai/',
    mapLink: 'https://yandex.ru/maps/org/olimpiyskiy_park/106634527518/?ll=39.954779%2C43.405691&z=16.86',
    image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/f5375493a4626d9801ffb6159acfd675/'
  },
  {
    name: 'Зимний Театр',
    description: 'Зимний театр в Сочи — это историческое здание, построенное в 1937 году, в стиле сталинского неоклассицизма, известное как главная театрально-концертная площадка города. Его архитектура включает 88 колонн, портик, украшенный скульптурами, и террасу с видом на море. Зал рассчитан на 950–970 мест и декорирован огромной хрустальной люстрой. Театр славится своей акустикой и является площадкой для концертов, спектаклей и крупных фестивалей, таких как «Кинотавр» и Crescendo.',
    rating: 5.0,
    price: 0,
    website: 'https://www.skfo.online/',
    mapLink: 'https://yandex.ru/maps/org/zimniy_teatr/114613194733/?ll=39.730548%2C43.572279&z=15.89',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmokEHEYS3BSC2JP9cAGhLYI2nRbQRhKc4Q&s'
  },
  {
    name: 'Океанариум Sochi Discovery World Aquarium',
    description: 'Поход в океанариум — отличный способ восхититься многообразием подводного мира. Здесь можно увидеть 400 видов морских и пресноводных обитателей — от черепах до акул. Они живут в 30 аквариумах, заполненных 5 млн литров воды. Яркие впечатления оставляет прогулка по подводному тоннелю — по нему идешь, окруженный толщей воды. Рыбок в открытых бассейнах можно кормить купленным в автомате кормом. Для посетителей проводятся шоу с плавающими за стеклом русалками.',
    rating: 4.8,
    price: 1400,
    website: 'https://www.sochiaquarium.ru/',
    mapLink: 'https://yandex.ru/maps/org/sochi_discovery_world_aquarium/175975357111/?ll=39.897155%2C43.471914&z=16.26',
    image: 'https://adler-laguna.ru/assets/images/fotogalereya/gorod/a4b7a489db90e5aa037e38215c26c6501.1.jpg'
  },
  {
    name: 'Агурские водопады',
    description: 'Первую экскурсионную тропу проложили в Сочи в 1911 году, и это была тропа к Агурским водопадам. Больших водопадов всего три: Нижний, Средний и Верхний. Первый считается самым живописным. Он состоит из двух каскадов высотой 18 м и 12 м. Оба потока низвергаются в небольшое озеро, где приятно освежиться в летнюю жару. Здесь же в разгар сезона готовят шашлыки и приглашают продегустировать местное вино. Отсюда вверх по скалам тянутся лесенки, которые приводят сначала к Среднему (высота 23 м), а потом и Верхнему водопаду (21 м). Ещё выше находятся совершенно отвесные Орлиные скалы. К ним, по легенде, был прикован древнегреческий Прометей. Ему установлен памятник на одной из вершин: герой изображен уже разорвавшим цепи. Если перейти реку Агуру вброд, можно сделать привал на широкой Поляне слётов. А можно двинуться дальше вверх, на гору Ахун, чтобы посмотреть на Кавказские горы и полюбоваться видами Сочи.',
    rating: 5.0,
    price: 200,
    website: 'https://npsochi.ru/',
    mapLink: 'https://yandex.ru/maps/org/agurskiye_vodopady/158828174543/?ll=39.823475%2C43.556614&z=14.91',
    image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/4/880eb219a9dddee08b010a07d5daaeba/'
  },
  {
    name: 'ТРЦ «МореМолл»',
    description: 'ТРЦ «Моремолл» — это торгово-развлекательный центр суперрегионального масштаба в Сочи, расположенный на пересечении улиц Донской и Новой Зари. Он включает в себя большое количество магазинов, супермаркет, фуд-корт, кинотеатр, кафе, ресторан, а также предлагает различные услуги (банк, аптека, салон красоты) и имеет большую наземную парковку на 2500 мест.',
    rating: 5.0,
    price: 0,
    website: 'https://www.moremall.ru/',
    mapLink: 'https://yandex.ru/maps/org/moremoll/1306461179/?ll=39.732181%2C43.605961&z=13.89',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/e9/39/07/caption.jpg?w=1200&h=1200&s=1'
  },
  {
    name: 'Дольмены Красной Поляны',
    description: 'Дольмены — загадочные древние сооружения, построенные из многотонных каменных плит. По мнению ученых, дольмены служили для захоронений или проведения культовых обрядов. Дольмены встречаются по всему миру, в том числе в России. Краснополянские сооружения построены в III-II тысячелетии до нашей эры. Шесть дольменов находятся в поселке Красная Поляна, на территории «Сочинского национального парка». К ним надо добираться по лесу, поэтому лучше надеть удобную обувь. Вход на территорию нацпарка платный.',
    rating: 5.0,
    price: 250,
    website: 'https://npsochi.ru/',
    mapLink: 'https://yandex.ru/maps/org/sochinskiy_natsionalny_park/1144104082/?ll=39.745206%2C43.569093&z=16.26',
    image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/c3ac425cef2a87c2b1600c79eb9b1831/'
  },
  {
    name: 'Автодром Сочи',
    description: 'Трасса автодрома известна тем, что раньше здесь ежегодно проводился российский этап «Формулы-1». Сейчас здесь проходит российская серия кольцевых гонок, марафоны и полумарафоны, чемпионаты по ходьбе, велогонки, соревнования на спортивных колясках и другие события. На автодром водят экскурсии. Отдельно можно сходить в музей автомобилей Ника Памули, где представлены редкие гоночные и ретроавтомобили, форма и награды гонщиков. Те, кто давно мечтал прокатиться на спорткаре, могут взять мастер-класс по вождению или просто насладиться быстрой ездой на пассажирском сиденье. Кроме того, для посетителей доступен картинг.',
    rating: 5.0,
    price: 2000,
    website: 'https://siriusautodrom.ru/',
    mapLink: 'https://yandex.ru/maps/org/sirius_avtodrom/1456082796/?ll=39.968832%2C43.409913&z=16.26',
    image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/9afde2f90917dc5d4ef15ac631a8bd99/'
  }
];

const Index = () => {
  const [bookingDialog, setBookingDialog] = useState<{ open: boolean; type: 'accommodation' | 'restaurant' | 'attraction' | null; data: string }>({
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
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm p-1 h-auto">
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
            <TabsTrigger value="attractions" className="flex items-center gap-2 py-3 text-sm md:text-base">
              <Icon name="MapPin" size={20} />
              <span className="hidden sm:inline">Что посетить</span>
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

          <TabsContent value="attractions" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((item, index) => (
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
                      {item.price === 0 ? 'Бесплатно' : `от ${item.price} ₽`}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
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
                        onClick={() => setBookingDialog({ open: true, type: 'attraction', data: item.website })}
                      >
                        <Icon name="Heart" size={16} className="mr-1" />
                        Хочу туда!
                      </Button>
                    </div>
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
              {bookingDialog.type === 'accommodation' ? 'Бронирование проживания' : bookingDialog.type === 'restaurant' ? 'Бронирование столика' : 'Информация о месте'}
            </DialogTitle>
            <DialogDescription>
              {bookingDialog.type === 'accommodation' 
                ? 'Перейдите по ссылке для бронирования' 
                : bookingDialog.type === 'restaurant'
                ? 'Позвоните по номеру для бронирования'
                : 'Перейдите на сайт для подробной информации'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 bg-secondary/50 p-4 rounded-lg">
            <div className="flex-1 text-sm break-all">
              {bookingDialog.type === 'restaurant' ? (
                <a href={`tel:${bookingDialog.data.replace(/[^+\d]/g, '')}`} className="text-primary hover:underline font-semibold text-lg">
                  {bookingDialog.data}
                </a>
              ) : (
                <a href={bookingDialog.data} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {bookingDialog.data}
                </a>
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              if (bookingDialog.type === 'restaurant') {
                window.location.href = `tel:${bookingDialog.data.replace(/[^+\d]/g, '')}`;
              } else {
                window.open(bookingDialog.data, '_blank');
              }
              setBookingDialog({ ...bookingDialog, open: false });
            }}
            className="w-full"
          >
            <Icon name={bookingDialog.type === 'restaurant' ? 'Phone' : 'ExternalLink'} size={16} className="mr-2" />
            {bookingDialog.type === 'restaurant' ? 'Позвонить' : 'Перейти на сайт'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;