import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FloatingEditButton(props) {
  const { classes } = props;
  return (
    <div>
      
      <Button variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
        <Icon>edit_icon</Icon>
      </Button>
      
    </div>
  );
}

FloatingEditButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingEditButton);