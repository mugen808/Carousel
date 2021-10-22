let imageIndex = 1

const [leftButton, rightButton] = document.getElementsByClassName('slider-button')
leftButton.addEventListener('click', (() => moveSlider(-1)))
rightButton.addEventListener('click', (() => moveSlider(+1)))

// Button fuction to slide image 'left' or 'right'
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
  
  // Reset the dots colors
  for (let dot of sliderDots) {
    dot.classList.remove('active')
  }
  // Clear displayed image
  for (let image of slides) {
    image.style.display = 'none'
  }

  // Prevent invalid indexes 
  if (index > slides.length) { imageIndex = 1 }
  if (index < 1) { imageIndex = slides.length }

  // Display correct image and activate corresponding dot
  sliderDots[imageIndex - 1].classList.add('active')
  slides[imageIndex - 1].style.display = 'block'
}
slideHandler(imageIndex)


const [form] = document.getElementsByClassName('user-search-form')


const handleDom = (repos=[]) => {
  // Clean previous results from the DOM so it won't stack
  const [resultsContainer] = document.getElementsByClassName('search-results')
  resultsContainer.replaceChildren()

  // If no user found, display a message
  if (repos === 404) {
    const notFound = document.createElement('p')
    notFound.innerHTML = 'User not found. Please try again with another username'
    resultsContainer.append(notFound)
    return
  }

  // If repos, iterate to create elements and include in the DOM
  repos.map(repo => {
    const {name, html_url} = repo

    const list = document.createElement('li')
    list.classList.add('repository')

    const repoName = document.createElement('p')
    repoName.innerHTML = name
    const repoLink = document.createElement('a')
    repoLink.href = html_url
    repoLink.innerHTML = html_url

    list.append(repoName, repoLink)
    resultsContainer.append(list)
  })
}

const handleRepos = async (url) => {
  const response = await fetch(`${url}/repos`)
  const data = await response.json()
  handleDom(data)
}

const handleSearch = async (e) => {
  e.preventDefault()
  const [userToSearch] = document.getElementsByName('username')
  const url = `https://api.github.com/users/${userToSearch.value}`
  userToSearch.value = ''
  const response = await fetch(url)
  const {public_repos} = await response.json()
  if (response.status === 404) {
    handleDom(response.status)
    return
  }

  if (public_repos > 0) {
    handleRepos(url)
  }
}

form.onsubmit = handleSearch