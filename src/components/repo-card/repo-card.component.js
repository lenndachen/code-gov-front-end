import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash.get'
import { round, some } from '@code.gov/cautious'
import {
  getLastModifiedDateString,
  getDisplayTextForUsageType,
  getLicenseName
} from 'utils/repo-parsing'
import CardPart from 'components/card-part'

export default class RepoCardComponent extends Component {

  get goToButton() {
    const url = get(this.props.repo, 'repositoryURL')
    if (typeof url === 'string' && url.includes('github.com')) {
      return (
        <div className="repo-button width-quarter">
          <a href={url} target="_blank">
            <button>Go to Repo</button>
          </a>
        </div>
      )
    }
  }

  get repoDescription() {
    const description = get(this.props.repo, 'description')
    if (description) {
      return <p className="card-description">{description.substring(0,400)}</p>
    }
  }

  get repoLanguages() {
    const repo = this.props.repo
    if (some(repo.languages)) {
      const languages = repo.languages
      return <CardPart title='Languages' text={languages.map(language => <span key={language}>&nbsp;{language}&nbsp;</span>)} />
    } else {
      return <CardPart title='Languages' text='N/A' />
    }
  }



  render() {
    const repo = this.props.repo
    const agencyAcronym = get(repo, 'agency.acronym')
    const agencyName = get(repo, 'agency.name')
    const score = get(repo, 'score')
    const dateLastModified = getLastModifiedDateString(this.props.repo)
    const usageType = getDisplayTextForUsageType(this.props.repo)
    const license = getLicenseName(this.props.repo)

    return (
      <div className="card-list-item card focusable">

        <quality-tag score={score}></quality-tag>

        <h3 className="card-title">
          <Link to={`/projects/${repo.repoID}`}>{repo.name}</Link>
        </h3>

        {agencyName && (
          <p className="repo-agency-icon">
            <span>{ agencyName }</span>
          </p>
        )}

        {this.repoDescription}

        <dl className="inline-after-600px">
          <dt>Agency:</dt>
          <dd><Link to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyName}</Link></dd>
          {this.dateLastModified}

          <CardPart title='Last Updated' text={dateLastModified} />

        </dl>

        <hr className="show-w-gt-600"/>

        <div>
          <dl className="width-three-quarters">

            <CardPart title='Usage Type' text={usageType} />
            {this.repoLanguages}
            <CardPart title='License' text={license} />

          </dl>
          {this.goToButton}
        </div>
      </div>
    )
  }
}
