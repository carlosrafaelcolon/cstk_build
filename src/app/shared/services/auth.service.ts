import { Injectable, NgZone  } from '@angular/core';
import { tokenNotExpired} from 'angular2-jwt';
import { Router }              from '@angular/router';
// Avoid name not found warnings
declare var Auth0Lock: any;

declare var config: any;


@Injectable()
export class AuthService {
		clientId = config.clientId;
		domain = config.domain;
		responseType = config.responseType;
		callbackURL = config.callbackURL;
		connection = config.connection;
		redirectUrl: string;

		lock = new Auth0Lock(this.clientId, this.domain, {
			theme: {
				logo: '/assets/images/logo/red_logo.png',
				primaryColor: '#002147',
				foregroundColor: "#000000", 
			},
			languageDictionary: {
				title: "CSTK"
			},
			auth: {
				redirect: false,
				responseType: this.responseType
			},
    		autoclose: true,
			initialScreen: 'login',
			rememberLastLogin: false,
			allowSignUp: false,
			defaultDatabaseConnection: this.connection,
		});

		userProfile: any;
		constructor(
			private router: Router,
			private ngZone: NgZone
			) {
			let self = this;
			// Set userProfile attribute of already saved profile
			// self.userProfile = JSON.parse(localStorage.getItem('profile'));
			// Add callback for the Lock `authenticated` event
			this.lock.on("authenticated", (authResult) => {
				 localStorage.setItem('id_token', authResult.idToken);

				// Fetch profile information
				  this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
					if (error) {
						// Handle error
						return;
					}
			
				
					// Save token and profile locally

					localStorage.setItem("accessToken", authResult.accessToken);
					localStorage.setItem("profile", JSON.stringify(profile));
					self.userProfile = profile;
					self.ngZone.run(() => self.authenticated());
					// Update DOM
				});
			});

		}
		public login() {
			// Call the show method to display the widget.
			this.lock.show();
		}

		public authenticated(): boolean {
			// Check if there's an unexpired JWT
			// This searches for an item in localStorage with key == 'id_token'
			return tokenNotExpired();
		}

		public logout() {
			// Remove token and profile from localStorage
			localStorage.removeItem('id_token');
			localStorage.removeItem('access_token');
			localStorage.removeItem('profile');
			this.userProfile = undefined;
			this.authenticated();
			this.router.navigate(['/']);
		}


		public isAdmin() {
			return this.userProfile && this.userProfile.app_metadata
			&& this.userProfile.app_metadata.roles
			&& this.userProfile.app_metadata.roles.indexOf('admin') > -1;
		}
}