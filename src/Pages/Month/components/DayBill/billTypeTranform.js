export const billListData = {
    pay: [
      {
        type: 'foods',
        name: '餐饮',
        list: [
          { type: 'food', name: '餐费' },
          { type: 'drinks', name: '酒水饮料' },
          { type: 'dessert', name: '甜品零食' },
        ],
      },
      {
        type: 'taxi',
        name: '出行交通',
        list: [
          { type: 'taxi', name: '打车租车' },
          { type: 'longdistance', name: '旅行票费' },
        ],
      },
      {
        type: 'recreation',
        name: '休闲娱乐',
        list: [
          { type: 'bodybuilding', name: '运动健身' },
          { type: 'game', name: '休闲玩乐' },
          { type: 'audio', name: '媒体影音' },
          { type: 'travel', name: '旅游度假' },
        ],
      },
      {
        type: 'daily',
        name: '日常支出',
        list: [
          { type: 'clothes', name: '衣服裤子' },
          { type: 'bag', name: '鞋帽包包' },
          { type: 'book', name: '知识学习' },
          { type: 'promote', name: '能力提升' },
          { type: 'home', name: '家装布置' },
        ],
      },
      {
        type: 'other',
        name: '其他支出',
        list: [{ type: 'community', name: '社区缴费' }],
      },
    ],
    income: [
      {
        type: 'professional',
        name: '工作收入',
        list: [
          { type: 'salary', name: '工资' },
          { type: 'overtimepay', name: '加班' },
          { type: 'bonus', name: '奖金' },
        ],
      },
      {
        type: 'other',
        name: '其他收入',
        list: [
          { type: 'financial', name: '理财收入' },
          { type: 'cashgift', name: '礼金收入' },
        ],
      },
    ],
  }
  
  export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
      bill.list.forEach(item => {
        prev[item.type] = item.name
      })
    })
    return prev
  }, {});

  export const addTypeToBills = (bills) => {
    return bills.map(bill => {
      // 判断账单类型（income/pay）
      const billType = bill.type === 'income' ? 'income' : 'pay';
      
      // 遍历对应类型的分类列表，找到父级分类
      const parentCategory = billListData[billType].find(category => 
        category.list.some(item => item.type === bill.useFor)
      );
  
      // 返回添加父级分类后的账单对象
      return {
        ...bill,
        categoryType: parentCategory ? parentCategory.type : '未分类'
      };
    });
  };