var React = require('react');

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
        var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
        
        return (
            <ul className="languages">
            <p>Selected Language: {this.state.selectedLanguage} </p>
                {languages.map(function (lang) {
                    return (
                        <li
                            onClick= {this.updateLanguage.bind(null, lang)}
                            key= {lang}
                            style= {lang === this.state.selectedLanguage ? {color: '#d0021b'}: null}>
                            {lang}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}

module.exports = Popular