const cleanUserInput = formInput => {
    const booleanStrings = ["true", "false"]

    Object.keys(formInput).forEach(field => {
        // check for required fields?

        // delete empty fields
        if (formInput[field] === "") {
            delete formInput[field]
        }
        // translate boolean strings
        if (formInput.isCool) {
            if (booleanStrings.includes(formInput.isCool)) {
                formInput.isCool === "true" ? formInput.isCool = true : formInput.isCool = false
            }
        }

        // convert int strings
        if (formInput.plays){
            formInput.plays = parseInt(formInput.plays)
        }
    })
    return formInput
}

export default cleanUserInput