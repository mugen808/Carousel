let imageIndex = 1



const moveSlider = (factor) => {
  imageIndex += factor
  slideHandler(imageIndex)
}
// const changeSlide = (index) => {
//   imageIndex = index + 1
//   slideHandler(imageIndex)
// }
// for (let i = 0; i < sliderDots.length; i++) {
//   sliderDots[i].classList.remove('active')
//   // sliderDots[i].addEventListener('click', () => changeSlide(i))
// }


const slideHandler = (index) => {
  const sliderDots = document.getElementsByClassName('dots')
  const slides = document.getElementsByClassName('slider-images')
  
  for (let dot of sliderDots) {
    dot.classList.remove('active')
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

const [form] = document.getElementsByClassName('user-search-form')
const [userToSearch] = document.getElementsByName('username')
const [resultsContainer] = document.getElementsByClassName('search-results')
const url = `https://api.github.com/users/${userToSearch.value}`

const handleRepos = async () => {
  const response = await fetch(`${url}/repos`)
  const data = await response.json()
  console.log('repos: ', data)
}

const handleSearch = async (e) => {
  e.preventDefault()  
  const response = await fetch(url)
  const {public_repos} = await response.json()
  if (public_repos > 0) {
    console.log('greater')
    handleRepos()
  }
}

form.onsubmit = handleSearch