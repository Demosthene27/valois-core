properties([
	parameters([
		string(name: 'COMMITISH_SDK', description: 'Commit-ish of ValoisHQ/valois-sdk to use', defaultValue: 'development' ),
		string(name: 'COMMITISH_CORE', description: 'Commit-ish of ValoisHQ/valois-core to use', defaultValue: 'development' ),
	])
])

pipeline {
	agent { node { label 'valois-build' } }
	options {
		skipDefaultCheckout()
		timeout(time: 10, unit: 'MINUTES')
	}
	stages {
		stage('Checkout SCM') {
			steps {
				cleanWs()
				dir('dev-cli') {
					checkout([$class: 'GitSCM', branches: [[name: "master" ]], userRemoteConfigs: [[url: 'https://github.com/ValoisHQ/dev-cli']]])
				}
				dir('valois-sdk') {
					checkout([$class: 'GitSCM', branches: [[name: "${params.COMMITISH_SDK}" ]], userRemoteConfigs: [[url: 'https://github.com/ValoisHQ/valois-sdk']]])
				}
				dir('valois-core') {
					checkout([$class: 'GitSCM', branches: [[name: "${params.COMMITISH_CORE}" ]], userRemoteConfigs: [[url: 'https://github.com/ValoisHQ/valois-core']]])
					sh '''
					jq '.version="'"$( jq --raw-output .version package.json )-$( cd ../valois-sdk && git rev-parse HEAD )-$( git rev-parse HEAD )"'"' package.json >package.json_
					mv package.json_ package.json
					if s3cmd --quiet info "s3://valois-releases/core/core-v$( jq --raw-output .version package.json )-linux-x64.tar.gz" 2>/dev/null; then
						echo "Build already exists."
						exit 1
					fi
					'''
				}
			}
		}
		stage('Build dev-cli') {
			steps {
				dir('dev-cli') {
					nvm(readFile("../valois-core/.nvmrc").trim()) {
						sh '''
						npm install --global yarn
						yarn
						yarn build
						npm install --global
						'''
					}
				}
			}
		}
		stage('Build SDK') {
			steps {
				dir('valois-sdk') {
					nvm(readFile(".nvmrc").trim()) {
						sh '''
						npm install --global yarn
						yarn
						yarn build
						npx lerna exec yarn unlink
						npx lerna exec yarn link
						npx lerna --loglevel error list >../packages
						'''
					}
				}
			}
		}
		stage('Build Core') {
			steps {
				dir('valois-core') {
					nvm(readFile(".nvmrc").trim()) {
						sh '''
						npm install --registry https://npm.valois.io/
						npm install --global yarn
						for package in $( cat ../packages ); do
						  yarn link "$package"
						done
						npm run build
						'''
					}
				}
			}
		}
		stage('Test Core') {
			steps {
				dir('valois-core') {
					nvm(readFile(".nvmrc").trim()) {
						sh 'npm test'
					}
				}
			}
		}
		stage('Pack Core build') {
			steps {
				dir('valois-core') {
					nvm(readFile(".nvmrc").trim()) {
						sh 'oclif-dev pack --targets=linux-x64'
					}
				}
			}
		}
		stage('Upload Core build') {
			steps {
				dir('valois-core') {
					sh '''
					core_version="$( jq --raw-output .version package.json )"
					cd dist/channels/*/valois-core-v${core_version}
					sha256sum "valois-core-v${core_version}-linux-x64.tar.gz" >"valois-core-v${core_version}-linux-x64.tar.gz.SHA256"
					s3cmd put --acl-public "valois-core-v${core_version}-linux-x64.tar.gz"        "s3://valois-releases/core/valois-core-v${core_version}-linux-x64.tar.gz"
					s3cmd put --acl-public "valois-core-v${core_version}-linux-x64.tar.gz.SHA256" "s3://valois-releases/core/valois-core-v${core_version}-linux-x64.tar.gz.SHA256"
					'''
				}
			}
		}
	}
}
// vim: filetype=groovy
