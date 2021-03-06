import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, CardActions, CardContent, Dialog, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setTagToEdit } from '../../store/ui';
import { recategorizeTag } from '../../store/tags';



const useStyles = makeStyles(theme => ({
  corkboard: {
    flexDirection: 'row',
  }
}));

const CorkBoard = () => {
  const classes = useStyles();
  const pinnedTags = useSelector(state => state.ui.pinnedTags);


  return (
    <>
      <Box className={classes.corkboard} display='flex'>
        {pinnedTags.map((tag, index) => <TagNotes key={index} position={index} tag={tag} />)}
      </Box>
    </>
  );
}

const TagEditForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tagToEdit = useSelector(state => state.ui.tagToEdit);
  const categories = useSelector(state => state.entities.categories)
  // const currentCategory = categories[tagToEdit.category_id - 1];
  // const [newName, setNewName] = useState(tagToEdit.name);
  const [newCategoryId, setNewCategoryId] = useState(tagToEdit.category_id);

  useEffect(() => {
    // setNewName(tagToEdit.name);
    setNewCategoryId(tagToEdit.category_id);
  }, [dispatch, tagToEdit]);

  // const changeName = (e) => {
  //   setNewName(e.currentTarget.value);
  // }

  const changeId = (e) => {
    setNewCategoryId(e.target.value);
  }

  const closeForm = (e) => {
    dispatch(setTagToEdit({}));
  }

  const handleSave = (e) => {
    dispatch(recategorizeTag(tagToEdit, newCategoryId));
    dispatch(setTagToEdit({}));
  }

  return (
    <>
      <Dialog open={tagToEdit.id} onClose={closeForm} >
        <Card >
          <CardContent display="flex" flexDirections="column" alignItems="center" >

            <Typography className={classes.title} variant='h5'>Edit Tag - {tagToEdit.name}</Typography>
            {/* <TextField
              defaultValue={tagToEdit.name}
              value={newName}
              onChange={changeName}
              label='New Tag Name' /> */}
            <Select
              defaultValue={tagToEdit.category_id}
              value={newCategoryId}
              onChange={changeId}
            >
              {/* <option value={tagToEdit.category_id}>{currentCategory.name}</option> */}
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
            {/* <Box>
            {currentUser.id ? (
              <>
                <Button onClick={openCampaigns} endIcon={<ExpandMoreIcon />}>
                  {currentCampaign.title ? currentCampaign.title
                    : <Typography variant='button'>Select a Campaign!</Typography>}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  onClose={closeCampaigns}
                  open={!!anchorEl}
                >
                  {campaigns ? Object.values(campaigns).map((campaign) => (
                    <MenuItem key={campaign.id} value={campaign.id} onClick={campaignClick} >
                      {campaign.title}
                    </MenuItem>
                  )) : null}
                </Menu>
              </>) : null}
          </Box> */}

          </CardContent>
          <CardActions>
            <Button onClick={handleSave} >Save</Button>
            <Button onClick={closeForm}>Cancel</Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
}

export default TagEditForm;