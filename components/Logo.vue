<template>
	<div class="container">
		<div class="shop">
			<div class="light"></div>
			<div class="top-sill"></div>
			<div class="curtain"></div>
			<div class="window">
			<div class="shine"></div>
			</div>
			<div class="door">
			<div class="shine"></div>
			</div>
			<div class="bottom-sill"></div>
		</div>
		<div class="line"></div>
	</div>
</template>

<style lang="scss" scoped>
	$border: #424B54;
	//.container,
	.shop,
	.curtain,
	.window,
	.door,
	.bottom-sill,
	.top-sill,
	.shine,
	.light,
	.line,
	.text {
		position: absolute;
	}

	//body {
	//	background: #EDEAD0;
	//}

	.container {
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: calc(400rem/45);
		height: calc(200rem/45);
		transform: scale(0.7);
	}

	.shop {
		width: calc(400rem/45);
		height: calc(200rem/45);
		background: #EDDEA4;
		border: calc(5rem/45) solid $border;
	}

	.light {
		width: calc(30rem/45);
		height:calc(30rem/45);
		border-radius: 100%;
		background: #FFCF56;
		left: calc(-60rem/45);
		top: calc(25rem/45);
		border: calc(5rem/45) solid $border;
		&:before,
		&:after {
			position: absolute;
			content: '';
		}
		&:before {
			top: calc(34rem/45);
			left: calc(13rem/45);
			width: calc(5rem/45);
			height: calc(30rem/45);
			background-color: $border;
			border-radius: calc(100rem/45)
		}
		&:after {
			top: calc(60rem/45);
			left: calc(13rem/45);
			width: calc(38rem/45);
			height: calc(5rem/45);
			background-color: $border;
			border-radius: calc(100rem/45);
		}
	}

	.top-sill {
		top:calc( -5rem/45);
		left: calc(-20rem/45);
		width: calc(430rem/45);
		height: calc(15rem/45);
		background: #FFF;
		border: calc(5rem/45) solid $border;
	}

	.curtain {
		z-index: 20;
		top: calc(30rem/45);
		left: calc(50rem/45);
		width: calc(300rem/45);
		height: calc(80rem/45);
		background: repeating-linear-gradient(to right, #FFF, #FFF calc(20rem/45), #F77AC0 calc(20rem/45), #F77AC0 calc(40rem/45));
		transform: rotateX(40deg);
		border: calc(5rem/45) solid $border;
		&:before,
		&:after {
			position: absolute;
			content: '';
		}
		&:before {
			top: calc(80rem/45);
			left: calc(-5rem/45);
			width: calc(300rem/45);
			height: calc(20rem/45);
			background: repeating-linear-gradient(to right, #FFF, #FFF calc(20rem/45), #F77AC0 calc(20rem/45), #F77AC0 calc(40rem/45));
			border: calc(5rem/45) solid $border;
		}
	}

	.window {
		z-index: 10;
		top: calc(120rem/45);
		left: calc(60rem/45);
		width: calc(120rem/45);
		height: calc(30rem/45);
		background: #ADE1E5;
		border: calc(5rem/45) solid $border;
		&:before,
		&:after {
			position: absolute;
			content: '';
		}
		&:before {
			top: calc(30rem/45);
			left: calc(-25rem/45);
			width: calc(160rem/45);
			height: calc( 10rem/45);
			background: #FFF;
			border: calc(5rem/45) solid $border;
		}
		.shine {
			top: calc(-17rem/45);
			left: calc(20rem/45);
			opacity: 0.5;
			border-bottom: calc(47rem/45) solid #FFF;
			border-left: calc(100rem/45) solid transparent;
			border-right: calc(1rem/45) solid transparent;
		}
	}

	.door {
		top: calc(65rem/45);
		left: calc(250rem/45);
		width: calc(70rem/45);
		height: calc(150rem/45);
		background: #FFF;
		border: calc(5rem/45) solid $border;
		border-bottom: none;
		&:before,
		&:after {
			position: absolute;
			content: '';
		}
		&:before {
			width: calc(40rem/45);
			height: calc(100rem/45);
			background: #ADE1E5;
			top: calc(30rem/45);
			left: calc(10rem/45);
			border: calc(5rem/45) solid $border;
		}
		.shine {
			top: calc(87rem/45);
			left: calc(15rem/45);
			opacity: 0.5;
			border-bottom: calc(47rem/45) solid #FFF;
			border-left: calc(38rem/45) solid transparent;
			border-right: calc(3rem/45) solid transparent;
		}
	}

	.bottom-sill {
		top: calc(200rem/45);
		left: calc(-25rem/45);
		width: calc(270rem/45);
		height: calc(15rem/45);
		background: #FFF;
		border: calc(5rem/45) solid $border;
		border-right: none;
		border-bottom: none;
		&:before {
			position: absolute;
			content: '';
			top: calc(-5rem/45);
			left: calc(349rem/45);
			width: calc(90rem/45);
			height: calc(15rem/45);
			background: #FFF;
			border: calc(5rem/45) solid $border;
			border-left: none;
			border-bottom: none;
		}
	}

	.line {
		top: calc(225rem/45);
		left: calc(-45rem/45);
		width: calc(500rem/45);
		height: calc(5rem/45);
		background: $border;
	}

	.text {
		top: calc(240rem/45);
		color: $border;
		font-family: sans-serif;
		letter-spacing: calc(2rem/45);
		
		a {
			color: #F77AC0;
			text-decoration: none;
		}
	}
</style>


