import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Reset from './views/Reset.vue'
import Home from './views/Home.vue'
import SubmitInfo from './views/inline_pages/SubmitInfo.vue'
import SubmitInfoList from './views/inline_pages/SubmitInfoList.vue'
import SubmitedInfoReview from './components/SubmitedInfoReview.vue'
//新增商户
import AddMerchantInfo from './views/inline_pages/AddMerchantInfo.vue'
import MerchantJoin from './views/inline_pages/MerchantJoin.vue'
import MJoinedInfo from './views/inline_pages/MJoinedInfo.vue'
import MerchantJoined from './views/inline_pages/MerchantJoined.vue'
import MerchantJoinInputInfo from './views/inline_pages/MerchantJoinInputInfo.vue'

import AddShopInfo from './views/inline_pages/AddShopInfo.vue'
//新增物料
import AddPartsNew from './views/inline_pages/AddParts_new.vue'
//新增物料列表
import AddPartsList from './views/inline_pages/AddPartsList.vue'


import AddParts from './views/inline_pages/AddParts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/reset',
        component: Reset,
        name: '',
        hidden: true
    },
    {
        path: '/MerchantJoin',
        component: Home,
        name: '商户操作',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/MerchantJoin', component: MerchantJoin, name: '商户入驻申请',redirect:'/merchantJoinInputInfo',children:[
                {
                    path:'/submitedInfoReview',
                    component:SubmitedInfoReview,
                    name:'查看提交信息',
                    hidden:true
                },
                {
                    path:'/merchantJoinInputInfo',
                    component:MerchantJoinInputInfo,
                    name:'商户入驻',
                    hidden:true,
                    children:[
                        {
                            path:"/merchantJoined",
                            component:MerchantJoined,
                            name:'商户入驻页',
                            hidden:true
                        },
                        {
                            path:"/merchantjoinedinfo",
                            component:MJoinedInfo,
                            name:'入驻信息页',
                            hidden:true
                        }
                    ]
                }
            ]
            },
            {
                path: '/submitInfo', component: SubmitInfo, name: '开通店铺',redirect:'/submitInfoList',
                children: [
                    {
                        path: '/submitInfoList',
                        component: SubmitInfoList,
                        name: '状态列表',
                    },{
                        path: '/addShopInfo',
                        component: AddShopInfo,
                        name: '添加店铺', 
                    },
                    {
                        path: '/addMerchantInfo',
                        component: AddMerchantInfo,
                        name: '添加商户信息',
                        hidden: true
                    }
                ]
            },
            {
                path: '/AddParts', component: AddParts, name: '物料提交',redirect:'/addPartsList',
                children: [
                    {
                        path: '/addPartsNew',
                        component: AddPartsNew,
                        name: '新增物料',
                        hidden: true
                    },
                    {
                        path: '/addPartsList',
                        component: AddPartsList,
                        name: '物料列表',
                        hidden: true
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/login' }
    }
];

export default routes;