import { connect } from 'react-redux';
import get from 'lodash.get'
import HomeBannerComponent from './home-banner.component'

const mapStateToProps = ({ siteConfig }) => {
  return {
    backgroundImage: get(siteConfig, 'images.background'),
    motto: get(siteConfig, 'content.home.banner.motto'),
    subtitle: get(siteConfig, 'content.home.banner.subtitle'),
    helpWantedTitle: get(siteConfig, 'content.home.banner.help_wanted.title'),
    helpWantedDescription: get(siteConfig, 'content.home.banner.help_wanted.description'),
    helpWantedButton: get(siteConfig, 'content.home.banner.help_wanted.button'),
    issueUrl: get(siteConfig, 'content.home.banner.issue_url'),
    searchDescriptionText: get(siteConfig, 'content.home.banner.search_description_text'),
    searchDescriptionTextMobile: get(siteConfig, 'content.home.banner.search_description_text_mobile'),
    searchPlaceholder: get(siteConfig, 'content.home.banner.search_placeholder_text'),
    browseByText: get(siteConfig, 'content.home.banner.browse_by_text')
  }
}

export default connect(mapStateToProps)(HomeBannerComponent)