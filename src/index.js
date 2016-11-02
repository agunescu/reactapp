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
// We also need a node package for youtube
const API_KEY = 'AIzaSyCKIEGoXvulPFysH1NtmQkSG8thJquW6oQ';

// JS modules
// Create a new component. This produce some HTML
// this is a class, fct as a factory which produces instances
// using compact syntax from ES6 for fct: =>
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

// I am going to use YoutTube Api to fetch data
// Acess to API is 100% FREE
// Take this comp and put it on the page (in the DOM)
// JSX tags to create an instance
// takes a second param as the target element
ReactDom.render(<App />, document.querySelector('.container'));