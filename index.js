let imageIndex = 1

const changeSlide = (index) => {

  imageIndex = index + 1
  slideHandler(imageIndex)
}

const moveSlider = (factor) => {
  imageIndex += factor
  slideHandler(imageIndex)
}



const slideHandler = (index) => {
  const sliderDots = document.getElementsByClassName('dots')
  const slides = document.getElementsByClassName('slider-images')
  
  for (let i = 0; i < sliderDots.length; i++) {
    sliderDots[i].classList.remove('active')
    sliderDots[i].addEventListener('click', () => changeSlide(i))
  }

  for (let image of slides) {
    image.style.display = 'none'
  }

  if (index > slides.length) { imageIndex = 1 }
  if (index < 1) { imageIndex = slides.length }

  sliderDots[imageIndex - 1].classList.add('active')
  slides[imageIndex - 1].style.display = 'block'
}

slideHandler(imageIndex)