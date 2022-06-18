import React from 'react';
import { Box, Tab, Tabs, Tooltip, makeStyles } from '@material-ui/core';
import { collapseString } from '../common/string';

const useStyles = makeStyles({
    root: {
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        minWidth: 700,
        borderRadius: 8,
        boxShadow: '0px 2px 5px 1px rgb(64 60 67 / 12%)'
    },

    tabs: {
        width: '60%',
        height: '100%'
    },
    tabPipeline: {
        width: 'fit-content !important',
        minWidth: '85px !important',
        borderRadius: '5px !important',
        height: '82% !important',
        minHeight: '0 !important',
        border: 1,
        borderColor: 'divider',
        margin: '0 5px !important',
        textTransform: 'none !important'
    },
    selectTabFirst: {
        transition: '0.5s',
        width: '100%',
        height: '100%',
        background: `linear-gradient(to right)`
    },
    selectTabMiddleLast: {
        transition: '0.5s',
        width: '100%',
        height: '100%',
        background: `linear-gradient(to right)`,
        margin: '0 10px !important'
    },
    parent: {
        height: '46px',
        display: 'flex',
        alignItems: 'center'
    },
    indicator: {
        display: 'none'
    },
    rootTab: {
        alignItems: 'center'
    },
    flexTabContainer: {
        height: 32,
        alignItems: 'center'
        // padding: '0 px'
    },
    tabDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '25%',
        height: 32,
        margin: 'auto 0 auto 10px',
        borderRadius: 20,
        border: '0.1px solid #ccc'
    }
});

const color = [
    '#2196f3',
    '#E53935',
    '#37474f',
    '#351C75',
    '#03A9F4',
    '#4CAF50',
    '#FF9800'
];

export default function PipeLine(props) {
    let { dataItems, onChange, style } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = React.useState([])

    React.useEffect(() => {
            dataItems?.map(tab => {
                const index = Math.floor(Math.random() * color.length);
                tab.color = color[index];
            })
            setTabs(dataItems)
    }, [JSON.stringify(dataItems)]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        let itemChecked = dataItems[newValue];
        onChange(itemChecked);
    };

    return (
        <Tabs
            className={classes.tabs}
            value={value}
            style={style}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            classes={{
                root: classes.rootTab,
                scroller: classes.parent,
                indicator: classes.indicator,
                flexContainer: classes.flexTabContainer
            }}
        >
            {tabs?.map((tab, index) => (
                <Tooltip title={tab.buildingName}>
                    <Tab
                        key={tab._id}
                        label={
                            <div className={classes.tabDiv}>
                                {collapseString(tab.buildingName, 6)}
                                <Box
                                    style={{
                                        width: 8,
                                        height: 8,
                                        backgroundColor: tab.color,
                                        borderRadius: '50%',
                                        marginLeft: 7
                                    }}
                                />
                            </div>
                        }
                        style={{
                            color: value === index ? 'white' : tab.color,
                            backgroundColor: value === index ? tab.color : '',
                            border: `1px solid ${tab.color}`
                        }}
                        className={classes.tabPipeline}
                        classes={{
                            selected:
                                index === 0
                                    ? classes.selectTabFirst
                                    : classes.selectTabMiddleLast
                        }}
                    />
                </Tooltip>
            ))}
        </Tabs>
    )
}
