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

const url = `https://api.github.com/users/${userToSearch.value}`

const handleDom = (repos) => {
  const [resultsContainer] = document.getElementsByClassName('search-results')
  repos.map(repo => {
    const {name} = repo
    const {html_url} = repo
    const list = document.createElement('ul')
    const repoName = document.createElement('li')
    repoName.innerHTML = name
    const repoLink = document.createElement('li')
    repoLink.innerHTML = html_url
    list.append(repoName, repoLink)
    resultsContainer.append(list)
  })
}

const handleRepos = async () => {
  const response = await fetch(`${url}/repos`)
  const data = await response.json()
  handleDom(data)
}

const handleSearch = async (e) => {
  e.preventDefault()  
  const response = await fetch(url)
  const {public_repos} = await response.json()
  if (public_repos > 0) {
    handleRepos()
  }
}

form.onsubmit = handleSearch