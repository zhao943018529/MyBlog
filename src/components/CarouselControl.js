import React from 'react';
// [{
// 	src:'xxxxx',
// 	url:'www.google.com',
// 	title:'aaaa'
// },{
// 	src:'www',
// 	url:'www.tesla.com',
// 	title:'xxx'
// }]

export default class CarouselControl extends React.Component{

		constructor(props){
			super(props);
			
			this.state={
				currentIndex:1,
			};
			this.inner=null;
			this.max=props.sliders.length+1;
			this.tid=null;
			this.isTransition=false;
			this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
			this.handleMouseLeave = this.handleMouseLeave.bind(this);
			this.handleMouseEnter = this.handleMouseEnter.bind(this);
		}

		componentDidMount(){
			this.startup();
		}

		startup(){
			let {intervalTime} = this.props;
			tid = setInterval(this.goNext,intervalTime);
		}

		createSlider(slider){

			return (
				<div className="carousel-item">
					<a href={slider.url}>
						<img src={slider.src} alt={slider.title}>
					</a>
				</div>
				);
		}

		handleTransitionEnd(event){
			let currentIndex = this.state.currentIndex;
			if(currentIndex>=this.max){
				currentIndex=1;
				removeTransition(this.inner);
			}else if(currentIndex<=0){
				removeTransition(this.inner);
				currentIndex=4;
			}

			this.setState({
				currentIndex:currentIndex,
			});
		}

		goNext(){
			addTransition(this.inner, 1);
			let currentIndex = this.state.currentIndex;
			currentIndex++;
			this.setState({
				currentIndex:currentIndex	
			}); 
		}

		goPre(){
			addTransition(this.inner, 1);
			let currentIndex = this.state.currentIndex;
			currentIndex--;
			this.setState({
				currentIndex:currentIndex	
			}); 
		}

		setTransform(elem, num) {
			elem.style.transform = 'translateX(' + num + 'px)';
		}

		addTransition(elem, time) {
			elem.style.transition = 'transform ' + time + 's ease-in-out';
		}

		removeTransition(elem) {
			elem.style.transition = "none";
		}

		createCarouselInner(){
			let {sliders} = this.props;
			let newSliders=[sliders[sliders.length-1],...sliders,sliders[0]];
			let items=newSliders.map(slider=>this.createSlider(slider));

			return (
					<div className="carousel-inner" ref={element=>this.inner=element} onTransitionEnd={this.handleTransitionEnd}>
						{items}
					</div>
				);
		}

		handleMouseLeave(event){
			clearInterval(this.tid);
		}

		handleMouseEnter(event){
			this.startup();
		}
		
		handleClick(dir){
			if(dir===-1){
				this.goPre();
			}else{
				this.goNext();
			}
		}

		createPreviousAndNext(){

			return (<div class="carousel-opt">
						<span class="previous" onClick={this.handleClick.bind(-1)}><i class="fas fa-chevron-circle-left"></i></span>
						<span className="next" onClick={this.handleClick.bind(1)}><i class="fa fa-chevron-circle-right"></i></span>
					</div>);
		}

		render(){

			return (<div className="carousel-slide" onMouseEnter={this.handleMouseenter} onMouseLeave={this.handleMouseLeave}>
				{this.createCarouselInner()}
				{this.createPreviousAndNext()}
			</div>);
		}
}