import store from '../store'
import { postRequest } from './api'

export const initMenu = (router, store) => {

    if (store.state.routes.length > 0) {
        return;
    }

    postRequest('/menus').then(resp => {
        if (resp) {
            let = fmtRoutes = formatRoutes(data)
            router.addRoutes(fmtRoutes)
            //数据封装到routes
            store.commit('initRoutes', fmtRoutes)
        }
    })



}


//格式化
export const formatRoutes = (routes) => {

    let fmyRoutes = [];

    routes.forEach(router => {

        let {
            path,
            component,
            name,
            iconCls,
            children,
        } = router;

        if (children && children instanceof Array) {

            children = formatRoutes(children)

        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                require(['../views' + component + '.vue'], resolve)
            }
        }
        
        fmyRoutes.push(fmRouter)


    });


}

