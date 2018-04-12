Vue.component('pane',{
	name:'pane',
	prop:{
		name:{
			type:String
		},
		label:{
			type:String,
			default:''
		}
	},
	template:`
		<div class="pane" v-show="show" >
			<slot></slot>
		</div>
	`,
	data(){
		return {
			show : true
		} 
	},
	methods:{
		updateNav(){
			this.$parent.updateNav()
		}
	},
	watch:{
		label(){
			this.updateNav();
		}
	},
	mounted(){
		this.updateNav()
	}
})