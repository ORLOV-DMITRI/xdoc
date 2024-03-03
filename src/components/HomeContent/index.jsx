import styles from "./HomeContent.module.scss";
import {Gruppo} from "next/font/google";
import cn from "classnames";

const logoFonts = Gruppo({subsets: ["latin"], weight: ["400", "400"]});

export default function HomeContent() {

    const logo = <span className={cn(logoFonts.className, styles.logo)}>XDOC</span>;
    return (
        <div className={styles.homeContent}>
            <h1 className={styles.title}>
                Добро пожаловать на {logo}!
            </h1>
            <p className={styles.info}>
                <span className={styles.infoTitle}>Что такое {logo} ?</span>
                Это ваш централизованный хаб для хранения, обмена и переиспользования сниппетов кода. Мы
                создали этот ресурс, чтобы помочь разработчикам экономить время и усилия, предоставив легкий доступ к
                коллекции повторно используемых фрагментов кода для различных языков программирования и технологий.
            </p>
            <p className={styles.info}>
                <span className={styles.infoTitle}>Что такое сниппет кода?</span>
                <span className={styles.infoText}>
                    Сниппет кода — это небольшой блок исходного кода, решающий определенную задачу или выполняющий конкретную функцию. Эти кусочки кода можно легко вставлять в более крупные проекты, экономя время и избегая дублирования усилий.
                </span>
            </p>

            <div className={styles.infoList}>
                <div className={styles.listTitle}>
                    Почему {logo} ?
                </div>
                <ul className={styles.list}>
                    <li className={styles.infoItem}>
                        <span>Экономия времени:</span>
                        Больше не нужно переписывать код с нуля. Найдите нужный сниппет и вставьте его в свой проект за
                        секунды.
                    </li>
                    <li className={styles.infoItem}>
                        <span>Качество:</span>
                        Все сниппеты проходят проверку нашим сообществом, чтобы вы получали только проверенный и рабочий
                        код.
                    </li>
                    <li className={styles.infoItem}>
                        <span>Обучение:</span>
                        Изучение сниппетов от других разработчиков может дать вам новые идеи и улучшить ваши навыки
                        программирования.
                    </li>
                    <li className={styles.infoItem}>
                        <span>Сотрудничество:</span>
                        Поделитесь своими сниппетами с сообществом и внесите свой вклад в рост коллективного знания.
                    </li>
                </ul>
            </div>
            <div className={styles.infoList}>
                <div className={styles.listTitle}>
                    Как начать работу?
                </div>
                <ol className={styles.list}>
                    <li className={styles.infoItem}>
                        <span>Регистрация:</span>
                        Создайте свой аккаунт, чтобы начать добавлять и сохранять сниппеты.
                    </li>
                    <li className={styles.infoItem}>
                        <span>Поиск сниппетов:</span>
                        Используйте наш поиск, чтобы найти сниппеты по ключевым словам, языкам программирования или
                        категориям.
                    </li>
                    <li className={styles.infoItem}>
                        <span>Добавление сниппетов:</span>
                        Поделитесь своими сниппетами с сообществом, добавив их на сайт.
                    </li>
                    <li className={styles.infoItem}>
                        <span>Переиспользование:</span>
                        Копируйте и используйте сниппеты в своих проектах, экономя время и силы.
                    </li>
                </ol>
            </div>

            <div className={styles.subtitle}>
                Мы рады приветствовать вас в сообществе {logo}! Вместе мы сделаем процесс разработки проще, быстрее и
                интереснее.
            </div>

        </div>
    );
};
