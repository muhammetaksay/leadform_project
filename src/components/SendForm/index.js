import axios from 'axios'
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs


export default {
			components: {
				LottieAnimation
			},
			data() {
				return {
					name: 'HelloWorld',
					questions: null,
					props: {
						msg: String
					},
					answers: [],
					ipAdress: '127.0.0.1',
					checkboxList: [],
					selectCheckboxList: [],
					project_id : 1,
					product_id : 1,
					lead_form_id : 1,
					customer_name: null,
					customer_surname: null,
					customer_email: null,
					customer_phone: null,
					result: '',
				}
			},
			watch: {
				// whenever question changes, this function will run
				customer_name: function (val) {
					// this.fullName = val + ' ' + this.lastName
					console.log('val', val);
				},
				questions: function (val) {
					// this.fullName = val + ' ' + this.lastName
					if(val != null){
						let checkbox = val.filter(e => e.form_type == "inputcheckbox");
						val[checkbox.id] = [];
						checkbox.forEach(element => {
							element.form_data.split(",").forEach(e => {
								this.checkboxList.push({element: 'question_' + element.id, answer: e});
							});
						});
					}
				},
			},
			methods: {
				async getQuestions(){
					await axios
					.get('http://127.0.0.1:8000/api/leadformquestion')
					.then((response) => this.questions = response.data.data.items);
				},
				getIpAdress(val){
					console.log(val);
				},
				submitForm(){
					// console.log("sea");
					// const test = [];
					// this.answers.forEach((i, element) => {
					// 	test.push(element);
					// });
					// console.log('selectCheckboxList', this.selectCheckboxList);
					// this.selectCheckboxList.forEach(element => {
					// 	console.log('el', element);
					// });
					// this.selectCheckboxList.forEach(element => {
					// 	element.split("_"));
					// });
					let myForm = document.getElementById('frm'); 
					let formData = new FormData(myForm);
					const data = {}; 
					// need to convert it before using not with XMLHttpRequest
					for (let [key, val] of formData.entries()) {
						Object.assign(data, {[key]: val})
					}
					Object.assign(data, {['project_id']: this.project_id})
					Object.assign(data, {['product_id']: this.product_id})
					Object.assign(data, {['lead_form_id']: this.lead_form_id})
					Object.assign(data, {['message']: 'Test Message'})
					Object.assign(data, {['ip_address']: '127.0.0.1'})
					// console.log('2222',data);
					axios
					.post('http://127.0.0.1:8000/api/lead', data)
					.then((response) => this.result = response.data);
					
					// console.log(val);
				}
			},
			async created() {
				await this.getQuestions();
				// console.log("created", this.questions);
			},
			async mounted () {
				// console.log("mounted", this.questions);
			},
			beforeMount() {
				// console.log("befıreMonunt");
			},
		}
