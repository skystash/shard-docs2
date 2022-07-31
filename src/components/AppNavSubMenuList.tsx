import React from 'react'
import classnames from 'classnames'
import { CategoryPropType } from '../prop-types'
import PropTypes from 'prop-types'
import AppNavMenuListButton from './AppNavMenuListButton'
import ArrowRight from './icons/ArrowRight'
import AppNavMenuList from './AppNavMenuList'
import './AppNavSubMenuList.scss'

type props = {
  item: category
  isActive: boolean
  onToggleMenu: (path: string) => void
}

const AppNavSubMenuList = (props: props) => {
  return (
    <div className="AppNavSubMenuList">
      <AppNavMenuListButton
        name={props.item.name}
        className="AppNavSubMenuList__button"
        onClick={() => props.onToggleMenu(props.item.path)}
        isActive={props.isActive}
        after={
          <ArrowRight
            className={classnames('AppNavSubMenuList__button-icon', {
              'AppNavSubMenuList__button-icon--expanded': props.item.isExpanded,
            })}
          />
        }
      />
      <AppNavMenuList
        className={classnames('AppNavSubMenuList__list', {
          'AppNavSubMenuList__list--expanded': props.item.isExpanded,
        })}
        items={props.item.items}
      />
    </div>
  )
}

AppNavSubMenuList.propTypes = {
  item: CategoryPropType,
  isActive: PropTypes.bool,
  onToggleMenu: PropTypes.func,
}

AppNavSubMenuList.defaultProps = {
  item: null,
  isActive: false,
  onToggleMenu: () => {},
}

export default AppNavSubMenuList
