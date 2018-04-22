let app = new Vue({
	el:"#app",
	data:{
		list:[
			{
				id:1,
				name:"iPhone7",
				price:6188,
				count:1
			},
			{
				id:2,
				name:"iPad pro",
				price:5888,
				count:1
			},
			{
				id:3,
				name:"MacBook",
				price:21888,
				count:1
			}
		],
		total:0,
		checkAllFlag:false,
		goodTotal:0
	},
	methods:{
		handleReduce(index){
			if(this.list[index].count === 1) {
				return 
			}
			this.list[index].count--;
			this.calcTotal()
		},
		handleAdd(index){
			this.list[index].count++;
			this.calcTotal()
		},
		countPrice(index){
			let good = this.list[index];
			if(typeof good.checked == "undefined"){
				this.$set(good,"checked",true)
			} else {
				good.checked = !good.checked;
			}
			this.calcTotal()
		},
		checkAll(){
			let _this = this;
			this.checkAllFlag = !this.checkAllFlag;
			this.list.forEach(function(item,index){
				if (typeof item.checked == "undefined") {
					_this.$set(item,"checked",_this.checkAllFlag)
				} else {
					item.checked = _this.checkAllFlag
				}
			})
			this.calcTotal()
		},
		calcTotal(){
			this.total = 0;
			this.list.forEach((item,index) => {
				if(item.checked){
					this.total += item.price * item.count;
				}
			})
		}
	}, 	
	filters:{
		totalPrice(total){
			return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
		}
	}
})