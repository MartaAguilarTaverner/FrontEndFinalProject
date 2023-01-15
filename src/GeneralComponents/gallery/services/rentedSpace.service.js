export class RentedSpaceService {
  getImages() {
    return fetch('data/photos.json')
      .then((res) => res.json())
      .then((d) => d.data); //take media and traduction of base64
  }
}
