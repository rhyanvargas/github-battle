var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage (props) {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className="languages">
            {languages.map( (lang) => 
                <li 
                    key={lang}
                    onClick={props.onSelect.bind(null, lang)}
                    style={lang === props.selectedLanguage ? {color: '#d0021b'}: null}
                >{lang}</li>
            )}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}


class Popular extends React.Component {
    // Set default language
    constructor(props) {
        super(props);
        this.state = {
                selectedLanguage: "All"
        };
        // Bind the this keyword to updateLanguage to refer to its specific component instance
        this.updateLanguage = this.updateLanguage.bind(this);
    }
        
    // Update Language 
    updateLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguage: lang
            }
        });
    }
    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage = {this.state.selectedLanguage}
                    onSelect = {this.updateLanguage}>
                </SelectLanguage>
            </div>
        )
    }
}

module.exports = Popular