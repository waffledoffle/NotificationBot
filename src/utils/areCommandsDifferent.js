//Returns true if a local command is different from its existing command counterpart and false if it is not different
module.exports = (existingCommand, localCommand) => {
  
  //This checks whether each choice of a command is different and returns true if it is but false if it is not
  const areChoicesDifferent = (existingChoices, localChoices) => {
    //for every choice present within a command  
    for (const localChoice of localChoices) {
        //find the current choices existing counterpart by using the current choices name
        const existingChoice = existingChoices?.find(
          (choice) => choice.name === localChoice.name
        );
        
        //If the choice does not exist return true as it is a new choice
        if (!existingChoice) {
          return true;
        }
        
        //if the choices value is different to its pre existing counterpart return true
        if (localChoice.value !== existingChoice.value) {
          return true;
        }
      }
      return false;
    };
    
    //Checks if the options are different to the pre existing commands options and returns true if they are different but false if not
    const areOptionsDifferent = (existingOptions, localOptions) => {
      //for every option present wi=thin a command
      for (const localOption of localOptions) {
        //find the current options pre existing counterpart by using the current options name
        const existingOption = existingOptions?.find(
          (option) => option.name === localOption.name
        );
        
        //If the option does not already exist return true as it is a new option
        if (!existingOption) {
          return true;
        }
        
        //If any part of an option is different return true
        if (
          localOption.description !== existingOption.description ||
          localOption.type !== existingOption.type ||
          (localOption.required || false) !== existingOption.required ||
          (localOption.choices?.length || 0) !==
            (existingOption.choices?.length || 0) ||
          areChoicesDifferent(
            localOption.choices || [],
            existingOption.choices || []
          )
        ) {
          return true;
        }
      }
      return false;
    };
    
    //if the current command is different to the pre existing command return true
    if (
      existingCommand.description !== localCommand.description ||
      existingCommand.options?.length !== (localCommand.options?.length || 0) ||
      areOptionsDifferent(existingCommand.options, localCommand.options || [])
    ) {
      return true;
    }
  
    return false;
  };