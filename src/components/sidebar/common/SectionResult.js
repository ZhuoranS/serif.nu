import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { ListItem, ListItemText, Typography, Button } from '@material-ui/core';
import { sectionHover, sectionHoverOff, removeSection } from 'actions';
import { getFormattedClassSchedule, isUnscheduled } from 'util/time';
import { sectionPropType } from 'util/prop-types';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
  sectionTitle: {
    fontWeight: 'bold',
  },
});

export default function SectionResult({ addSection, section, disabled }) {
  const dispatch = useDispatch();

  const sectionIsUnscheduled = section.schedules.some(isUnscheduled);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const message = 'Class successfully added';
  const handleUndoClick = () => {
    dispatch(removeSection(section.id, section.color));
    enqueueSnackbar('Class successfully removed', {
      variant: 'success',
    });
  };
  const undoButton = () => <Button onClick={handleUndoClick}>Undo</Button>;

  const handleClick = () => {
    addSection(section);
    enqueueSnackbar(message, {
      variant: 'success',
      action: undoButton,
    });
  };

  return (
    <ListItem
      key={section.id}
      button
      onClick={handleClick}
      onMouseEnter={() => dispatch(sectionHover(section))}
      onMouseLeave={() => dispatch(sectionHoverOff())}
      disabled={disabled || sectionIsUnscheduled}
    >
      <ListItemText>
        <Typography variant="h6" className={classes.sectionTitle}>
          {`Section ${section.sectionNumber}`}
        </Typography>

        {section.topic && <Typography>{section.topic}</Typography>}

        {section.schedules.map((scheduleObj, index) => (
          /* eslint-disable react/no-array-index-key */
          <Typography color={sectionIsUnscheduled ? 'error' : undefined} key={index}>
            {getFormattedClassSchedule(scheduleObj)}
          </Typography>
          /* eslint-enable react/no-array-index-key */
        ))}

        <Typography>{section.schedules[0].location}</Typography>

        <Typography>
          {section.instructors.map((teacher, idx) => (
            `${teacher}${idx !== section.instructors.length - 1 ? ', ' : ''}`))
          }
        </Typography>
      </ListItemText>
    </ListItem>
  );
}

SectionResult.propTypes = {
  addSection: PropTypes.func.isRequired,
  section: PropTypes.shape(sectionPropType).isRequired,
  disabled: PropTypes.bool,
};

SectionResult.defaultProps = {
  disabled: false,
};
