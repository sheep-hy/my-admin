import Mock from 'mockjs'
let list = []
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body)
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              "path": "/",
              "icon": 's-home',
              "name": "home",
              "label": "首页",
              "url": "home/index",
              "children": []
            },
            {
              "path": "/mall",
              "icon": 'video-play',
              "name": "mall",
              "label": "商品管理",
              "url": "mall/index",
              "children": []
            },
            {
              "path": "/user",
              "icon": 'setting',
              "name": "user",
              "label": "用户管理",
              "url": "User/index",
              "children": []
            },
            {
              "path": "/other",
              "icon": 'setting',
              "label": "其他",
              "name": "other",
              "children": [
                {
                  "path": "/page1",
                  "icon": 'setting',
                  "name": "page1",
                  "label": "页面1",
                  "url": "Other/pageOne",
                  "children": []
                },
                {
                  "path": "/page2",
                  "icon": true,
                  "name": "page2",
                  "label": "页面2",
                  "url": "Other/pageTwo",
                  "children": []
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          messag: "获取成功"
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        menu: [
          {
            "path": "/",
            "icon": 's-home',
            "name": "home",
            "label": "首页",
            "url": "Home/Home",
            "children": []
          },
          // {
          //   "path": "/mall",
          //   "icon": 'video-play',
          //   "name": "mall",
          //   "label": "商品管理",
          //   "url": "MallManage/MallManage",
          //   "children": []
          // },
          {
            "path": "/video",
            "icon": 'video-play',
            "name": "video",
            "label": "商品管理",
            "url": "mall/index",
            "children": []
          },
        ],
        token: Mock.Random.guid(),
        messag: "获取成功"
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}