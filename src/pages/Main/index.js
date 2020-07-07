import React, { Component } from 'react'
import Picture from '../../components/Picture'
import api from '../../services/Api'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import md5 from 'js-md5'
import './index.css'


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            loading: false
        };
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
      }

    componentDidMount() {
        this.loadCharacters();
      }
    
    loadCharacters = async () => {
        this.setState({
            loading: true
          })

        const PRIVATE_KEY  = this.refs.private.value;
        const PUBLIC_KEY  = this.refs.public.value;
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const response = await api.get(`/characters?ts=${timestamp}&orderBy=name&limit=100&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        this.setState({pageCount: Math.ceil(response.data.data.results.length / this.state.perPage), data: response.data.data.results})
        console.log(response.data.data.results)
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadCharacters()
        });
  
    };

    render() { 
        const { data } = this.state
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        return(
            <div>
                <div className='section-search'>
                    <br />
                    <h3><strong>Dados de acesso</strong></h3>  
                        <div id='search-bar'>
                                <input type='text' placeholder='private_KEY' ref='private'/>
                                <input type='text' placeholder='public_KEY' ref='public'/>
                        </div>                
                            <button className='search-btn' onClick={this.loadCharacters}><i className="fa fa-search" aria-hidden="true"></i>
                            ACESSAR
                            </button>
                </div>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  />
                  
                <div className='section-characters'>
                    <div className='characters-list'>
                        <ul>
                        {slice.map(characters => (
                            <li key={characters.id}>
                               <div className='img-profile'>
                               <React.Fragment>
                                    <Picture
                                      url={characters.urls[0].url}
                                      title={characters.title}
                                      thumbnail={characters.thumbnail.path + '.' + characters.thumbnail.extension}
                                    >
                                    </Picture>
                                    </React.Fragment>
                                   </div>
                                <div className='info-profile'>
                                    <h2>{characters.name}</h2>
                                    <p>{characters.description}</p>
                                </div>

                                <div>
                                <Link to={`/details/${characters.id}`}> Acessar Detalhes </Link>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
