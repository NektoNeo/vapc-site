import { useMemo, useState } from "react";
import appStyles from "../App.module.scss";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import styles from "./PcClub.module.scss";
import { goToLink } from "../helpers/helpers";

const heroBullets = [
  {
    icon: "🛡️",
    title: "Надежные компьютеры",
    desc: "с гарантией до 3 лет и быстрым сервисным обслуживанием.",
  },
  {
    icon: "🔥",
    title: "Комплексное решение:",
    desc: "от сборки «под ключ» до полного технического сопровождения. Никакого головняка.",
  },
  {
    icon: "⚡",
    title: "Энергоэффективные компоненты",
    desc: "помогут сэкономить на основной расходной части и увеличить доход.",
  },
];

const whyCards = [
  {
    chip: "01",
    title:
      "Собираем так, чтобы не пришлось чинить и часто обслуживать, несмотря на круглосуточную работу. Меньше простоя - больше выручка.",
  },
  {
    chip: "02",
    title:
      "Гарантия до 3-х лет. Поддержка 7 дней в неделю. Решим любые проблемы. Если что-то выйдет из строя — быстро заменим, без проблем.",
  },
  {
    chip: "03",
    title:
      "Энергоэффективные ПК - это реально. Игры на ультрах, а электросчетчик — на минималках. Счета за свет на 20% меньше.",
  },
  {
    chip: "04",
    title:
      "Всё, что нужно — уже готово к работе. Стабильная ОС, лицензионное ПО, антивирус. Никаких багов, вирусов и танцев с бубном.",
  },
];

const trustItems = [
  "Никакого Б/У. Только оригинальные компоненты с официальной гарантией от производителя",
  "Гибкие условия: рассрочка, оптовые скидки, трейд-ин для устаревших ПК. У нас не только выгодно, но и удобно.",
  "Установка «под ключ»: привозим, подключаем и настраиваем технику на вашей площадке.",
  "Бегать по поставщикам - не ваша задача. Мы подберем каждое игровое место: от коврика до кресла. Периферия - в подарок.",
];

const builds = [
  {
    id: "base",
    title: "Обычный зал",
    badge: "Доступный старт с высоким FPS",
    features: [
      "Процессор: Ryzen 5 5500",
      "Материнская плата: A520M",
      "Кулер: AG200 100W TDP",
      "Видеокарта: Nvidia GeForce RTX 3050",
      "ОЗУ: DDR4 16GB (8x2) 3200 МГц",
      "SSD: 256 ГБ M.2 NVMe",
      "Корпус: 1STPLAYER TRILOBITE T5",
      "Блок питания: DeepCool PFX 500",
    ],
    notes: [
      "Оптимально для основной зоны клуба: максимум отдачи при минимальных вложениях.",
      "Стабильная работа без перегревов даже при круглосуточной нагрузке",
    ],
    games: [
      { name: "Counter Strike 2", fps: 260, note: "FullHD" },
      { name: "Dota 2", fps: 160, note: "FullHD" },
      { name: "Valorant", fps: 240, note: "FullHD" },
      { name: "PUBG", fps: 140, note: "FullHD" },
    ],
  },
  {
    id: "advanced",
    title: "Продвинутый зал",
    badge: "Баланс мощности и стоимости",
    features: [
      "Процессор: Intel Core i5-12400F",
      "Материнская плата: H610M DDR4",
      "Кулер: XASTRA AR400 ARGB",
      "Видеокарта: Nvidia GeForce RTX 3060",
      "ОЗУ: DDR4 16GB (8x2) 3200 МГц",
      "SSD: 500 ГБ M.2 NVMe",
      "Корпус: XASTRA A303 ARGB",
      "Блок питания: DeepCool PFX 600",
    ],
    notes: [
      "Дешево - не значит плохо. Компромиссное решение под современный гейминг без крупных вложений.",
      "Охлаждения и блока питания хватит с запасом под будущий апгрейд.",
    ],
    games: [
      { name: "Counter Strike 2", fps: 340, note: "FullHD" },
      { name: "Dota 2", fps: 200, note: "FullHD" },
      { name: "Fortnite", fps: 250, note: "FullHD" },
      { name: "GTA V Online", fps: 180, note: "FullHD" },
    ],
  },
  {
    id: "premium",
    title: "Премиум зал",
    badge: "Топовое «железо» для максимальной производительности.",
    features: [
      "Процессор: Intel Core i5-13400F",
      "Материнская плата: H610M DDR5",
      "Кулер: AG400 220W TDP",
      "Видеокарта: Nvidia GeForce RTX 5060Ti 16GB",
      "ОЗУ: DDR5 32 ГБ (16x2) 6000 МГц",
      "SSD: 500 ГБ M.2 NVMe",
      "Корпус: 1STPLAYER MIKU Mi2-A",
      "Блок питания: DeepCool PL650D",
    ],
    notes: [
      "Лучший выбор как для любителей сингл-проектов, так и заядлых онлайн-геймеров",
      "Стабильный 2k-гейминг на ультрах во всех популярных и новейших играх",
    ],
    games: [
      { name: "Counter Strike 2", fps: 430, note: "2K" },
      { name: "Dota 2", fps: 260, note: "2K" },
      { name: "Apex Legends", fps: 200, note: "2K" },
      { name: "Call of Duty: Warzone 2", fps: 160, note: "2K" },
    ],
  },
  {
    id: "vip",
    title: "VIP зал",
    badge: "Элитный уровень для лучших игроков",
    features: [
      "Процессор: Intel Core i5-13400F",
      "Материнская плата: B760M DDR5",
      "Кулер: AX620 275W TDP",
      "Видеокарта: Nvidia GeForce RTX 4070",
      "ОЗУ: DDR5 32 ГБ (16x2) 6000 МГц",
      "SSD: 500 ГБ M.2 NVMe",
      "Корпус: 1STPLAYER MV5",
      "Блок питания: DeepCool PL750D",
    ],
    notes: [
      "Только топовые компоненты для безграничной мощности. Идеально для VIP-комнат и профессиональных турниров",
      "Подчеркивает статус клуба и удовлетворяет самых требовательных клиентов",
      "Эффектный дизайн: премиум-корпус, тихое охлаждение, низкие температуры и яркая ARGB-подсветка",
    ],
    games: [
      { name: "Counter Strike 2", fps: 520, note: "2K" },
      { name: "Dota 2", fps: 300, note: "2K" },
      { name: "Cyberpunk 2077", fps: 160, note: "2K" },
      { name: "Escape from Tarkov", fps: 240, note: "2K" },
    ],
  },
];

const customCards = [
  {
    icon: "✅",
    title:
      "Никаких шаблонов: подберем индивидуальную конфигурацию, учитывая любое ваше пожелание",
  },
  {
    icon: "💾",
    title:
      "ПК под любой сценарий – от VR-аттракционов до киберспортивных арен",
  },
];

const ideasCards = [
  "«Кастом любого характера: винил, покраска, гравировка. Мы умеем всё»",
  "Нестандартные корпуса, особое охлаждение, брендирование вашего компьютера",
  "Максимальная выгода: вы платите только за то, что действительно нужно, без лишних затрат",
  "Результат — уникальные ПК, идеально подходящие вашему клубу и выделяющие его среди конкурентов",
];

const serviceSteps = [
  "Забираем ПК в удобное время",
  "Мы следим за состоянием ваших ПК, а вы сконцентрированы на бизнесе",
  "Проверяем, чистим, обновляем",
  "Возвращаем свежими и готовыми к работе",
  "Всё быстро, с гарантией и без лишних пауз в работе",
];

const bonusList = [
  "Индивидуальные скидочные условия и XL коврики в подарок",
  "Доставка и подключение - бесплатно по Москве",
  "Стабильный сервис и поддержка - 7/0 на связи, поможем без вопросов",
  "Trade-in программа: примем старых ПК в зачёт новых - выгодное обновление вашего оборудования (индивидуально)",
  "Бесплатная консультация и помощь с подбором: поддержим вас на каждом этапе открытия и развития клуба",
];

const upgradeSteps = [
  "Произведем диагностику систем и анализ компонентов",
  "Предложим наилучшие варианты под актуальный апгрейд",
  "Закажем комплектующие и произведем все работы по замене",
  "Настроим, протестируем, доставим и установим все ПК обратно",
];

const contacts = [
  {
    icon: "👥",
    title: "230 тыс. + подписчиков",
    desc: "Подписывайтесь на наш YouTube",
    link: "https://youtube.com/@vapcbuild",
  },
  {
    icon: "▶️",
    title: "@vapcbuild наш YouTube",
    desc: "Смотри свежие кейсы и сборки",
    link: "https://youtube.com/@vapcbuild",
  },
  {
    icon: "📞",
    title: "+7 (977) 877 7784",
    desc: "Позвонить или написать в WhatsApp",
    link: "https://wa.me/79778777784",
  },
];

const PcClub = () => {
  const [activeBuildId, setActiveBuildId] = useState(builds[0].id);
  const activeBuild = useMemo(
    () => builds.find((item) => item.id === activeBuildId) || builds[0],
    [activeBuildId]
  );

  const maxFps = useMemo(
    () => Math.max(...activeBuild.games.map((game) => game.fps)),
    [activeBuild]
  );

  return (
    <div className={`${appStyles.main} ${styles.pcClubPage}`}>
      <Header />
      <div className={`${appStyles.container} ${styles.pageContainer}`}>
        <section className={styles.hero} id="pc-club">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1>Игровые ПК</h1>
              <h2>для компьютерных клубов</h2>
              <div className={styles.heroCard}>
                <p className={styles.cardTitle}>
                  Поднимите свой клуб на новый уровень с нашими игровыми ПК!
                </p>
                {heroBullets.map((item) => (
                  <div key={item.title} className={styles.bullet}>
                    <span className={styles.bulletIcon}>{item.icon}</span>
                    <div>
                      <div className={styles.bulletTitle}>{item.title}</div>
                      <div className={styles.bulletDesc}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.ctaRow}>
                <Button
                  type="pink"
                  onClick={() => goToLink("https://t.me/VAPC_Manager_bot")}
                >
                  Получить консультацию
                </Button>
                <span className={styles.pill}>7 дней в неделю на связи</span>
                <span className={styles.pill}>Гарантия до 3 лет</span>
              </div>
            </div>
            <div className={styles.heroIllustration} aria-hidden>
              {/* TODO: Заменить на реальное изображение компьютера */}
              {/* <img src="/images/pc-club-hero.png" alt="Игровой ПК для клуба" className={styles.heroImage} /> */}
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderIcon}>🖥️</span>
                <span className={styles.placeholderText}>Изображение ПК</span>
              </div>
              <div className={styles.heroRig}>
                <div className={styles.rigFans}>
                  <div className={styles.rigFan}></div>
                  <div className={styles.rigFan}></div>
                  <div className={styles.rigFan}></div>
                </div>
                <div className={styles.rigFooter}>
                  <span>VA-PC CLUB EDITION</span>
                  <span>RGB • 80PLUS • READY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="why-us">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Почему нас выбирают клубы</h3>
          </div>
          <div className={styles.whyGrid}>
            {whyCards.map((card) => (
              <div key={card.chip} className={styles.whyCard}>
                <div className={styles.chipRow}>
                  <span className={styles.bulletIcon}>{card.chip}</span>
                </div>
                <p className={styles.bulletDesc}>{card.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="trust">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Компьютеры без компромиссов</h3>
            <p className={styles.sectionSubtitle}>
              Мы собираем, обслуживаем и обновляем ваши ПК, чтобы вы занимались
              клубом, а не железом.
            </p>
          </div>
          <div className={styles.trustList}>
            {trustItems.map((item) => (
              <div key={item} className={styles.trustItem}>
                <span className={styles.dot}></span>
                <p className={styles.bulletDesc}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="builds">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Примеры сборок для ваших клубов</h3>
            <p className={styles.sectionSubtitle}>
              Выбирайте нужный уровень или запросите индивидуальное решение.
            </p>
          </div>
          <div className={styles.examples}>
            <div className={styles.buildTabs}>
              {builds.map((build) => (
                <button
                  key={build.id}
                  className={`${styles.buildTab} ${
                    activeBuildId === build.id ? styles.buildTabActive : ""
                  }`}
                  onClick={() => setActiveBuildId(build.id)}
                  type="button"
                >
                  {build.title}
                </button>
              ))}
            </div>
            <div className={styles.buildBody}>
              <div className={styles.buildCard}>
                <div className={styles.buildBadge}>{activeBuild.badge}</div>
                <div className={styles.featureList}>
                  {activeBuild.features.map((feature) => (
                    <div key={feature} className={styles.feature}>
                      <span className={styles.dot}></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.noteList}>
                  {activeBuild.notes.map((note) => (
                    <span key={note}>• {note}</span>
                  ))}
                </div>
              </div>
              <div className={styles.gameCard}>
                {activeBuild.games.map((game) => (
                  <div key={game.name} className={styles.gameRow}>
                    <div>
                      <p className={styles.cardTitle}>{game.name}</p>
                      <p className={styles.bulletDesc}>FPS {game.note}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className={styles.cardTitle}>{game.fps}</p>
                    </div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${(game.fps / maxFps) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="custom">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>А может что-то особенное?</h3>
          </div>
          <div className={styles.dualCards}>
            {customCards.map((card) => (
              <div key={card.title} className={styles.customCard}>
                <span className={styles.iconBadge}>{card.icon}</span>
                <p className={styles.bulletDesc}>{card.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="ideas">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Реализуем любые идеи</h3>
          </div>
          <div className={styles.listGrid}>
            {ideasCards.map((text, index) => (
              <div key={text} className={styles.listItem}>
                <span className={styles.iconBadge}>0{index + 1}</span>
                <p className={styles.bulletDesc}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="service">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Мы берём на себя обслуживание</h3>
          </div>
          <div className={styles.stepList}>
            {serviceSteps.map((step, idx) => (
              <div key={step} className={styles.stepItem}>
                <span className={styles.stepBadge}>{idx + 1}</span>
                <p className={styles.bulletDesc}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="bonus">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Бонусы и условия</h3>
          </div>
          <div className={styles.listGrid}>
            {bonusList.map((item, idx) => (
              <div key={item} className={styles.listItem}>
                <span className={styles.stepBadge}>{idx + 1}</span>
                <p className={styles.bulletDesc}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="upgrade">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              Компьютеры в вашем клубе устарели? Время прокачать их
            </h3>
          </div>
          <div className={styles.stepList}>
            {upgradeSteps.map((step, idx) => (
              <div key={step} className={styles.stepItem}>
                <span className={styles.stepBadge}>{idx + 1}</span>
                <p className={styles.bulletDesc}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="contacts">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Контакты</h3>
            <p className={styles.sectionSubtitle}>
              Позвоните или напишите – ответим на все вопросы и подберём решение
              именно под ваш клуб.
            </p>
          </div>
          <div className={styles.contacts}>
            {contacts.map((item) => (
              <button
                key={item.title}
                className={styles.contactCard}
                type="button"
                onClick={() => goToLink(item.link)}
              >
                <span className={styles.iconBadge}>{item.icon}</span>
                <div className={styles.contactContent}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <p className={styles.bulletDesc}>{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};

export default PcClub;
