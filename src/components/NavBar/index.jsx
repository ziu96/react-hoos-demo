import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'zarm'
import { useHistory, useLocation } from 'react-router-dom'
import CustomIcon from '../CustomIcon'
import s from './style.module.less'

const NavBar = ({ showNav }) => {
    const [activeKey, setActiveKey] = useState(useLocation().pathname) // 拿到 location 实例 react-router-dom 中的 Router Hooks方法
    const history = useHistory() // useHistory可以直接访问到history,而不再需要通过 props 访问
    // 抽离坐标内容
    const tabBarArr = [
        { path: '/', title: '账单', icon: 'zhangdan' },
        { path: '/data', title: '统计', icon: 'tongji' },
        { path: '/user', title: '我的', icon: 'wode' }
    ]
    // 跳转
    const changeTab = path => {
        setActiveKey(path)
        history.push(path)
    }

    // TabBar为zarm组件 属性
    // visible：用于控制导航栏的显示隐藏。
    // activeKey：当前被点击的导航栏。
    // onChange：点击导航栏之后的回调方法，path 参数为 TabBar.Item 的 itemKey 属性
    return (
        <TabBar visible={showNav} className={s.tab} activeKey={activeKey} onChange={changeTab}>
            {tabBarArr.map(item => (
                <TabBar.Item itemKey={item.path} title={item.title} key={item.path} icon={<CustomIcon type={item.icon} />} />
            ))}
            {/* <TabBar.Item itemKey="/" title="账单" icon={<CustomIcon type="zhangdan" />} />
            <TabBar.Item itemKey="/data" title="统计" icon={<CustomIcon type="tongji" />} />
            <TabBar.Item itemKey="/user" title="我的" icon={<CustomIcon type="wode" />} /> */}
        </TabBar>
    )
}

NavBar.propTypes = {
    showNav: PropTypes.bool // 接受外部传来的值 且类型为布尔值
}

export default NavBar
