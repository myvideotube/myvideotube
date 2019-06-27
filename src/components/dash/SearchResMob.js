import React, {Component} from 'react';
import ModalVideo from '../layout/ModalVideo';
import LikeVideo from '../layout/LikeVideo.js';
import SeeLater from '../layout/SeeLater.js';
import InfoVideo from '../layout/InfoVideo.js';
import { connect } from 'react-redux';
import $ from 'jquery';

const array_geral = [];

class SearchResMob extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vimeovideo: ' ',
            ytvideo: ' ',
            dailyvideo: ' ',
            array_videos: [],
            isOpen: false,
            id: ' ',
            display: 'none',
            displayvideos: 'none',
            mostarBotoes: 'none',
            videomobile: 'none',
            idbotao: ' ',
            title: ' ',
            description : ' ',
            img: ' ',
            vimeoID: ' ',
            dailyID: '',
            youtubeID: '',
            info: false,
            click: false,
            later: false,
            dailyvideo: [],
            array_shuffle: [],

            //added 2606
            mostarBotoes: 'none',
            idbotao: ' ',
            videomobile: 'none',
            duration: '',
        };
    }

    toggleModal = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });

        window.location.hash = "#/modal";

    this.setState({id: e.currentTarget.id, vimeoID: e.currentTarget.getAttribute("vimeoID"), dailyID: e.currentTarget.getAttribute("dailyID"), youtubeID: e.currentTarget.getAttribute("youtubeID")})
    this.setState({title: e.currentTarget.getAttribute("title"), description: e.currentTarget.getAttribute("description")})
    }

    videoMobile = (e) => {
           this.setState({
               videomobile: 'block'
           })
       };


    handleRouteChange(event) {
        const destination = event.newURL;
        if(window.location.hash !== "#/modal"){
            window.location.reload();
            // this.setState({ redirect: 1 });
        }
    }

    toogleInfo = (e) => {
          e.preventDefault();

          this.setState({
              info: !this.state.info
          });


          if (this.state.info === false) {

              $('.quickview').on('click', quickView);
              $('.quickviewContainer .close').on('click', function () {
                  $('.quickviewContainer').removeClass('active');
              })
              $('.quickviewContainer').addClass('active');
              ;

          }
          else {
              clearTimeout(timeQuick);
              if ($('.quickviewContainer').hasClass('active')) {
                  $('.quickviewContainer').removeClass('active');
                  var timeQuick = setTimeout(function () {
                      $('.quickviewContainer').addClass('active');
                  }, 300);
              } else {
                  $('.quickviewContainer').addClass('active');
              }
          }

          function quickView() {

          }

          if(e.currentTarget.getAttribute("description") == null || e.currentTarget.getAttribute("description") == '' || e.currentTarget.getAttribute("description") == ' ' || e.currentTarget.getAttribute("description") == '...' || e.currentTarget.getAttribute("description") == 'none' || e.currentTarget.getAttribute("description") == 'None' ) {
              this.setState({description: "The video hasn't description"});

          }
          else {
              this.setState({description: e.currentTarget.getAttribute("description")});
          }

          this.setState({id: e.currentTarget.id, title: e.currentTarget.getAttribute("title")});
          this.setState({img: e.currentTarget.getAttribute("img")});
      };



    displayButtons = (e) =>{
        e.preventDefault();

        if(this.state.mostarBotoes == 'none') {
            this.setState({mostarBotoes: 'block', idbotao: e.currentTarget.id});
        }
        else {
            this.setState({mostarBotoes: 'none'});
        }
    };

    componentDidMount(){
        window.addEventListener('hashchange', this.handleRouteChange, false);
    }

    fetchFirst(url) {
        if (url) {

            const vimeoURL = 'https://api.vimeo.com/videos?query=' + url + '&per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd';
            const finalURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + url + '&type=video&key=AIzaSyDhsERNhsX0wnS3dW-Vc9eMykFvrLKeqQ8&maxResults=3'
            const dailyURL = 'https://api.dailymotion.com/videos?fields=id,thumbnail_360_url,title,embed_url,description,duration&thumbnail_ratio=widescreen&language=eng&search=' + url + '';

            fetch(finalURL)
                .then((resp) => resp.json())
                .then((resp) => {
                        this.setState({ytvideo: resp.items});

                        fetch(vimeoURL)
                            .then((resp) => resp.json())
                            .then((resp) => {
                                this.setState({vimeovideo: resp.data});

                                fetch(dailyURL)
                                    .then((resp) => resp.json())
                                    .then((resp) => {
                                        this.setState({dailyvideo: resp.list});
                                        //      (this.state.dailyvideo)

                                        for (let i in this.state.dailyvideo) {

                                            array_geral.push({
                                                "id": this.state.dailyvideo[i].id,
                                                "dailyID": this.state.dailyvideo[i].id,
                                                "title": this.state.dailyvideo[i].title,
                                                "img": this.state.dailyvideo[i].thumbnail_360_url,
                                                "link": this.state.dailyvideo[i].embed_url,
                                                "description": this.state.dailyvideo[i].description,
                                                "duration": this.state.dailyvideo[i].duration
                                        });

                                            //      (this.state.dailyvideo[i].embed_url)
                                        }

                                        for (let i in this.state.vimeovideo) {
                                            array_geral.push({
                                                "id": this.state.vimeovideo[i].uri.substr(8),
                                                "dailyID": this.state.vimeovideo[i].uri.substr(8),
                                                "title": this.state.vimeovideo[i].name,
                                                "img": this.state.vimeovideo[i].pictures.sizes[2].link,
                                                "link": 'https://player.vimeo.com/video/' + this.state.vimeovideo[i].uri.substr(8),
                                                "description": this.state.vimeovideo[i].description,
                                                "duration": this.state.vimeovideo[i].duration
                                        });

                                            //      (this.state.vimeovideo[i].uri.substr(8))
                                        }

                                        for (let i in this.state.ytvideo) {
                                            array_geral.push({
                                                "id": this.state.ytvideo[i].id.videoId,
                                                "title": this.state.ytvideo[i].snippet.title,
                                                "img": this.state.ytvideo[i].snippet.thumbnails.medium.url,
                                                "link": "https://www.youtube.com/embed/" + this.state.ytvideo[i].id.videoId,
                                                "youtubeID": this.state.ytvideo[i].videoId
                                            });
                                            //    ("https://www.youtube.com/embed/" + this.state.ytvideo[i].id.videoId)
                                        }

                                        this.setState({array_videos: array_geral});
                                        //      (array_geral.length)

                                        const videos = this.state.array_videos;

                                        //    (videos)

                                        const arrayShuffle = this.state.array_videos;

                                        function shuffleArray(arrayShuffle) {

                                            for (let i = arrayShuffle.length - 1; i > 0; i--) {
                                                const j = Math.floor(Math.random() * (i + 1));
                                                const temp = arrayShuffle[i];
                                                arrayShuffle[i] = arrayShuffle[j];
                                                arrayShuffle[j] = temp;

                                            }
                                            return arrayShuffle;

                                        }

                                        this.setState({array_shuffle: shuffleArray(arrayShuffle)})
//  (this.state.array_shuffle)


                                    }).catch((error) => {
                                    console.error(error)
                                })
                            })
                            .catch((error) => {
                                console.error(error)
                            })


                    }
                )
        } else {
            this.array_geral = null;
        }

    }


    render() {

      const { auth } = this.props;

        return (

            <div className="col-lg-12" style={{display: this.state.display}}>
                {/*titulo*/}
                <h5 className="mt-5 ml-1" id="lo" style={{color: 'white'}}>Searched by "{this.props.result}"</h5>

                <hr className="ml-1"
                    style={{background: 'linear-gradient(90deg, #801336, transparent)', height: '1px', border: 0}}/>


                <div className="row square" id="content"
                     style={{display: this.state.displayvideos}}>
                    {this.state.array_videos.length === 0 || this.props.result === " " ?
                        <div className="col-lg-12 mx-auto text-center" style={{
                            height: "100px",
                            border: "1px solid rgba(0,0,0,.125)",
                            padding: "35px",
                            color: "lightgray"
                        }}>No videos found.</div>
                        :
                        this.state.array_videos.map((item, i) => {
                          if(!this.props.auth.uid) {
                            return(
                              <div className="card largura quickview aumento" style={{margin: "auto"}} id={i} key={i}>
                                <div className="altura">
                                  <div className="card_categoria" id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}>
                                      <img className="card-img-top cartao " src={item.img}/>
                                  </div>
                                  <div className="row">
                                      <div className="col-11 titulo-video">
                                          <span className=""> {item.title} </span>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            )
                          } else {
                            if (this.state.idbotao == i) {
                            const player = "https://www.youtube.com/embed/" + item.id;
                            return (
                                <div className="card largura quickview aumento" style={{margin: "auto"}} id={i} key={i}>
                                  <div className="altura">
                                    <div className="card_categoria"id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}>
                                        <img className="card-img-top cartao " src={item.img}/>
                                    </div>
                                    <div className="row">
                                        <div className="col-11 titulo-video">
                                            <span className=""> {item.title} </span>
                                        </div>
                                        <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}}
                                           class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                    </div>
                                    <div className="botoes-mobile"
                                         style={{display: this.state.mostarBotoes}}>
                                        <LikeVideo click={this.state.click}
                                                   idlike={this.state.idlike}
                                                   item={item} addLike={this.addLike}
                                                   id={item.id} title={item.title}
                                                   description={item.description}
                                                   img={item.img} link={item.link}/>

                                        {/*--- BOTÃO DE INFO */}
                                        <div className="botao-info-mobile"
                                             onClick={this.toogleInfo} id={item.id}
                                             title={item.title}
                                             description={item.description}>
                                            <button style={{
                                                backgroundColor: "transparent",
                                                color: "white", width: '100%'
                                            }}>
                                                <i className="fas fa-info-circle fa-2x"
                                                   style={{
                                                       float: 'left',
                                                       marginRight: '1rem'
                                                   }}></i>
                                                <div className="display-mobile" style={{
                                                    padding: '6px',
                                                    textAlign: 'left'
                                                }}>
                                                    <span style={{
                                                        textAlign: 'left',
                                                        marginTop: '5px',
                                                        width: '90%'
                                                    }}>Info</span>
                                                </div>
                                            </button>

                                        </div>
                                        {/*--- BOTÃO DE LATER */}
                                        <SeeLater later={this.state.later} items={item}
                                                  addLater={this.addLater} id={item.id}
                                                  title={item.title}
                                                  description={item.description}
                                                  img={item.img} link={item.link} duration={item.duration}/>
                                      </div>

                                    </div>
                                </div>
                            )
                        } else {
                          return(
                          <div className="card largura quickview aumento" style={{margin: "auto"}}>
                            <div className="altura">
                              <div className="card_categoria"id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}>
                                  <img className="card-img-top cartao " src={item.img}/>
                              </div>
                              <div className="row">
                                  <div className="col-11 titulo-video">
                                      <span className=""> {item.title} </span>
                                  </div>
                                  <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}}
                                     class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                              </div>
                            </div>
                          </div>
                        )
                        }
                          }
                        })
                    }
                </div>
                <InfoVideo img={this.state.img} title={this.state.title} description={this.state.description} id={this.state.id}/>

                <ModalVideo show={this.state.isOpen} onClose={this.toggleModal} link = {array_geral} id = {this.state.id} vimeoID = {this.state.vimeoID} dailyID = {this.state.dailyID} youtubeID = {this.state.youtubeID} title={this.state.title} description={this.state.description} />
            </div>
        )
    }

    componentDidUpdate(prevProps) {

        if (prevProps.result !== this.props.result) {

            this.getinfo(this.props.result);
        }
    }

    getinfo = (s) => {

        if (s !== this.search && s.length > 2) {
          this.setState({display: 'block'});
            this.setState({displayvideos: 'flex'});
            this.search = s;
            this.fetchFirst(s)
        } else {
            array_geral.length = 0;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(SearchResMob);
