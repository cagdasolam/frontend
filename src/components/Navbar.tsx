import React, { Dispatch, SetStateAction } from 'react';
import { Layout, Menu,  } from 'antd';
import {
	HomeOutlined,
	AppstoreOutlined,
	ContainerOutlined,
	UnorderedListOutlined,
	
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {MenuInfo, MenuClickEventHandler} from 'rc-menu/lib/interface'


const { Header } = Layout;

interface Props {
	currentPath: string,
	setCurrentPath: Dispatch<SetStateAction<string>>
}

const Navbar = (props: Props) => {

	const handleMenuClick: MenuClickEventHandler = (e: MenuInfo) => {
		props.setCurrentPath(e.key);
	};

	return (
		<Header>
			<div className="logo" />
			<Menu theme="dark" mode="horizontal" selectedKeys={[props.currentPath]} onClick={handleMenuClick}>
				<Menu.Item key="/home" icon={<HomeOutlined />}>
					<Link to="/home">Home</Link>
				</Menu.Item>
				<Menu.Item key="/companies" icon={<AppstoreOutlined />}>
					<Link to="/companies">Companies</Link>
				</Menu.Item>
				<Menu.Item key="/products" icon={<ContainerOutlined />}>
					<Link to={"/products"}>Products</Link>
				</Menu.Item>
			</Menu>
		</Header>
	);
};

export default Navbar;