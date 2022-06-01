import * as React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    left: '0px !important',
    height: '100%',
    width: '100%',
    backgroundColor: `#373737 !important`
  },
  listItem: {
    '&:hover': {
      backgroundColor: `rgba(0,0,0,0.05) !important`,
      '& span': {
        color: '#fff',
      },
      '& div i': {
        color: '#fff'
      }
    }
  },
  listItemSelect: {
    backgroundColor: `#5e5e5e !important`,
    '& span': {
      color: '#fff',
      fontSize: 'white',
      fontWeight: 700
    },
    '& div i': {
      color: '#fff',
      fontSize: 'white',
      fontWeight: 700
    }
  },
  icon: {
    textAlign: 'center',
    '& i': {
      fontSize: 18,
      color: '#828282'
    }
  },
  textIcon: {
    fontSize: 16,
    fontWeight: 400,
    color: '#828282'
  },
}));

function Nav() {
    const classes = useStyles();;
    const history = useHistory();
    const [indexListItem, setIndexListItem] = React.useState(0);

    React.useEffect(() => {
        let currentUrl = window.location.href;
        if (currentUrl.includes('Home')) {
          setIndexListItem(0);
        } else if (currentUrl.includes('Setting')) {
          setIndexListItem(1);
        }
    }, []);

    const dataItems = [
        {
            text: 'Trang chủ',
            icon: <i className="fas fa-home"></i>,
            link: '/Home'
        },
        {
            text: 'Cấu hình',
            icon: <i className="fas fa-cog"></i>,
            link: '/Setting'
        }
    ];

    const handleLinkTo = link => {
        history.push(link);
    };

    const handleListItemClick = (index) => {
        setIndexListItem(index);
        handleLinkTo(index);
    };

    const renderTextListItem = (text, className) => {
        return <span className={className}>{text}</span>;
      };

    const renderIcons = () => {
        return (
            <>
                <List className={classes.list}>
                    {dataItems.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                classes={{
                                    root:
                                        indexListItem === index
                                            ? classes.listItemSelect
                                            : classes.listItem
                                }}
                                button
                                onClick={() => handleListItemClick(item.link)}
                            >
                                <ListItemIcon
                                    classes={{
                                        root: classes.listIconClose
                                    }}
                                    className={classes.icon}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={renderTextListItem(item.text, classes.textIcon)}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </>
        );
    };

    return (
        <div className={classes.root}>
            <div style={{ marginTop: '100px', width: '100%', left: 0 }}>
                {renderIcons()}
            </div>
        </div>
    );
}


export default Nav;