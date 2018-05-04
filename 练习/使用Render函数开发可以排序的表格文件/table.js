Vue.component('vTable',{
  props:{
    columns:{
      type:Array,
      default(){
        return [];
      }
    },
    data:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      currentColumns:[],
      currentData:[]
    }
  },
  methods:{
    makeColumns(){
      this.currentColumns = this.columns.map( (col,index) => {
        // 添加一个字段表示当前排序的状态
        col._sortTpye = 'normal';
        // 添加一个字段表示当前在数组中的索引
        col._index = index;
        return col;
      })
    },
    makeData(){
      this.currentData = this.data.map( (row,index) => {
        row._index = index;
        return row
      })
    },
    handleSortByAsc(index){
      let key = this.currentColumns[index].key;
      this.currentColumns.forEach( (col) => {
        col._sortTpye = 'normal'
      });
      this.currentColumns[index]._sortTpye == 'asc';
      
      this.currentData.sort( (a,b) => {
        return a[key] > b[key] ? 1 : -1
      })
    },
    handleSortByDesc(index){
      let key = this.currentColumns[index].key;
      this.currentColumns.forEach( (col) => {
        col._sortTpye = 'normal'
      });
      this.currentColumns[index]._sortTpye == 'desc';
      
      this.currentData.sort( (a,b) => {
        return a[key] < b[key] ? 1 : -1
      })
    }
  },
  mounted() {
    this.makeColumns();
    this.makeData();
  },
  watch:{
    data(){
      this.makeData();
      let sortedColumn = this.currentColumns.filter( (col) => {
        return col._sortTpye !== "normal";
      })

      if (sortedColumn.length > 0) {
        if (sortedColumn[0]._sortTpye === "asc"){
          this.handleSortByAsc(sortedColumn[0]._index)
        } else {
          this.handleSortByDesc(sortedColumn[0]._index)
        }
      }
    }
  },
  render(h){
    let _this = this;
    let ths = []; 
    let trs = []; // 表格主体
    
    // 主体trs是一个二维数组，数据由currentColumns和currentData组成
    this.currentData.forEach( (row) => {

      let tds =[];
      this.currentColumns.forEach( (cell) => {
        tds.push(h('td',row[cell.key]))
      })
      trs.push(h('tr',tds));
    })
    // 表头的节点ths要复杂一点，因为有排序功能；
    this.currentColumns.forEach( (col,index) => {
      if (col.sortable) {
        ths.push(h('th',[
          h('span',col.title),
          // 升序
          h('a',{
            class:{
              on:col._sortTpye === "asc"
            },
            on:{
              click(){
                _this.handleSortByAsc(index)
              }
            }
          },"↑"),
          // 降序
          h('a',{
            class:{
              on:col._sortTpye === "desc"
            },
            on:{
              click(){
                _this.handleSortByDesc(index);
              }
            }
          },"↓")
        ]))
      } else {
        ths.push(h('th',col.title))
      }
    })
    return h('table',[
      h('thead',[
        h('tr',ths)
      ]),
      h('tbody',trs)
    ])
  }
})