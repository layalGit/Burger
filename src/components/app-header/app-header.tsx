import styles from './app-header.module.css';

import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to='/'
						end
						className={({ isActive }) =>
							`${styles.navLink} ${isActive ? styles.active : ''} pt-4 pb-4`
						}>
						{({ isActive }) => (
							<>
								<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>Конструктор</p>
							</>
						)}
					</NavLink>

					<NavLink
						to='/feed'
						end
						className={({ isActive }) =>
							`${styles.navLink} ${isActive ? styles.active : ''} pt-4 pb-4`
						}>
						{({ isActive }) => (
							<>
								<ListIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									Лента заказов
								</p>
							</>
						)}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>

				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						`${styles.navLink} ${isActive ? styles.active : ''} pt-4 pb-4`
					}>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<p className='text text_type_main-default ml-2'>Личный кабинет</p>
						</>
					)}
				</NavLink>
			</nav>
		</header>
	);
};
