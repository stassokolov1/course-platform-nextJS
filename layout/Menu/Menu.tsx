import {useContext} from "react";
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import styles from './Menu.module.css';
import {TopLevelCategory} from "../../interfaces/page.interface";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";


export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <>
                {
                    firstLevelMenu.map(m => (
                        <div key={m.route}>
                            <Link href={`/${m.route}`}>
                                <a href={`/${m.route}`}>
                                    <div className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]: m.id == firstCategory
                                    })}>
                                        {m.icon}
                                        <span>{m.name}</span>
                                    </div>
                                </a>
                            </Link>
                            {m.id == firstCategory && buildSecondLevel(m)}
                        </div>
                    ))
                }
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {
                    menu.map(item => {
                        if (item.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                            item.isOpened = true;
                        }
                        return (
                            <div key={item._id.secondCategory}>
                                <div className={styles.secondLevel} onClick={() => openSecondLevel(item._id.secondCategory)}>
                                    {item._id.secondCategory}
                                </div>
                                <div className={cn(styles.secondLevelBlock, {
                                    [styles.secondLevelBlockOpened]: item.isOpened
                                })}>
                                    {buildThirdLevel(item.pages, menuItem.route)}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    const buildThirdLevel = (page: PageItem[], route: string) => {
        return (
            page.map(p => (
                <Link key={p._id} href={`/${route}/${p.alias}`}>
                    <a href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>
                        {p.category}
                    </a>
                </Link>
            ))
        );
    };

    return (
        <div className={styles.menu}>
            {
                buildFirstLevel()
            }
        </div>
    );
};
