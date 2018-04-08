var React = require('react');
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');
var Link = require('react-router-dom').Link;



class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        // prevent sending to server
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username,
        )
    }
    handleChange(event) {
        var value = event.target.value;
        this.setState (function () {
            return {
                username: value,
            }
        })
    }
    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input  
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off' 
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}
                >
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage:null,
            playerTwoImage: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleSubmit(id, username) {
        this.setState(function () {
            // Set "Player{One or Two}" + "Name" to user inputed username state prop...same goes for image
            var newState = {};
            newState[id + 'Name'] = username,
            newState[id + 'Image'] = 'https://github.com/' +username+ '.png?size=200'
            
            return newState;
        });
    };
    
    handleReset(id) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = '',
            newState[id + 'Image'] = null;
            
            return newState;
        })
    }
    render() {
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        
        return (
            <div>
                <div className='row'>
                    {!playerOneName && 
                        <PlayerInput 
                            id='playerOne' 
                            label='Player One' 
                            onSubmit={this.handleSubmit} 
                        />
                    }
                            
                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                        >
                            <button
                                className='button reset'
                                onClick={this.handleReset.bind(null, 'playerOne')}> 
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                    
                    {!playerTwoName && 
                        <PlayerInput 
                            id='playerTwo' 
                            label='Player Two' 
                            onSubmit={this.handleSubmit}
                        />
                    }
                    
                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                        >
                            <button
                            className='button reset'
                            onClick={this.handleReset.bind(null, 'playerTwo')}> 
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                </div>
                
                {playerOneImage && playerTwoImage &&
                    <Link
                        className='button'
                        to={{
                                pathname: match.url + '/results',
                                search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
                            }}>
                        Battle
                    </Link>
                }
            </div>
        )
    }
}


module.exports = Battle;