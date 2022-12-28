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
              "path": "/home",
              "icon": 's-home',
              "name": "home",
              "label": "首页",
              "url": "Home.vue",
              "children": []
            },
            {
              "path": "/mall",
              "icon": 'video-play',
              "name": "mall",
              "label": "商品管理",
              "url": "Mall.vue",
              "children": []
            },
            {
              "path": "/user",
              "icon": 'setting',
              "name": "user",
              "label": "用户管理",
              "url": "User.vue",
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
                  "url": "PageOne.vue",
                  "children": []
                },
                {
                  "path": "/page2",
                  "icon": true,
                  "name": "page2",
                  "label": "页面2",
                  "url": "PageOne.vue",
                  "children": []
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: "获取成功"
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              "path": "/home",
              "icon": 's-home',
              "name": "home",
              "label": "首页",
              "url": "Home.vue",
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
              "url": "Mall.vue",
              "children": []
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功"
        }

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