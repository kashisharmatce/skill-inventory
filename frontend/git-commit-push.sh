#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    if [[ "$OSTYPE" == "msys" ]]; then
        # Use a workaround for Windows Git Bash environment variable export
        export $(grep -v '^#' .env | xargs -d '\n')
    else
        set -a
        source .env
        set +a
    fi
else
    echo ".env file not found! Exiting."
    exit 1
fi

# Function to print simple log messages
log() {
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    RED="\033[0;31m"
    RESET="\033[0m"

    if [ "$1" = "success" ]; then
        echo -e "${GREEN}$2${RESET}"
    elif [ "$1" = "warning" ]; then
        echo -e "${YELLOW}$2${RESET}"
    elif [ "$1" = "error" ]; then
        echo -e "${RED}$2${RESET}"
    else
        echo "$2"
    fi
}

# Function to check current GitHub user and prompt for continuation
check_current_login() {
    log "warning" "Current GitHub login: $(git config user.name) & $(git config user.email)"
    log "warning" "Press Enter to continue."
    read
}

# Function to log in to GitHub and perform Git operations
login_to_github() {
    name=$1
    email=$2

    log "warning" "Logging out..."
    gh auth logout

    log "warning" "Logging in with $email..."
    if gh auth login; then
        log "success" "Logged in as: $(gh api user --jq '.login')"
        log "warning" "Email: $email"
        git config --global user.name "$name" && git config --global user.email "$email"
        log "warning" "Git user configuration set to: $(git config --get user.name) & $(git config --get user.email)"
    else
        log "error" "GitHub login failed."
        exit 1
    fi
}

# Function to commit and push changes
commit_and_push() {
    git add .
    git commit -m "Committing changes"
    git push origin main
    log "success" "Changes pushed to repository."
}

# Main execution
check_current_login  # Show current login status and wait for user to continue

# Login with personal account, commit and push
# login_to_github "$GIT_USER_NAME" "$COMPANY_EMAIL"
login_to_github "$GIT_USER_NAME" "$PERSONAL_EMAIL"
commit_and_push
# Login with company account, no commit or push
