/**
 * Parent component
 * @author Alex
 */
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from  './components/video_detail';
// Allows us to make request to YOUTUBE YouTube Data API v3
const API_KEY = 'AIzaSyCKIEGoXvulPFysH1NtmQkSG8thJquW6oQ';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo : null
        };

        this.videoSearch('coldplay');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        // Called once every 300ms
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container'));