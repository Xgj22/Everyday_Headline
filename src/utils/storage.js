// 存储数据
export const setItem = (key,value) =>{
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}

// 获取数据
export const getItem = (key) => {
    const data = window.localStorage.getItem(key)
    try {
        // 返回 JSON 格式 data ，如果本身是 JSON 会报错
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

// 删除数据
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}