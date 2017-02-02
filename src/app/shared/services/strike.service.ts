export interface Strike {

	strikeId: number;
	date: string;
	time: string;
	numStrikes: number;
	reviewed: boolean;
	extended:boolean;
	onBorder:boolean;
	stateStatus:string;
	countries: {
		attackers: [
			{
			country: string;
			probability: string;
			}
		],
		targets: [
			{
			country: string;
			region: string;
			division: string;
			subdivision: string;
			locale: string;
			}
		]
	},
	type: {
		weaponTypes: [
			{
				term: string;
				clear: boolean;
			}
		],
        actionTypes: [
			{
				term: string;
				clear: boolean;
			}
        ],
	},
	objects: [
		{
			type: string;
			stationary:boolean;
			clear:boolean;
		}
	],
	groupReported: boolean;
	group: [
		{
			
			name: string;
			clear:boolean;
		}
	],
    peopleReported: boolean;
	people: [
		{
			
			name: string;
			status:string;
			clear:boolean;
		}
	],
	casualties: {
		totals: number;
		susMils: number;
		civilians: number;
		unknowns: number;
		hvts: number;
		children: number;
	},
	details: string[];
	sources: [
      {
        title: string;
        link: string;
        altLink: string;
        pubDate: Date;
		countStatistics: boolean;
        tags: string[];
		mainReport: {
          casualties: {
            totals: number;
            susMils: number;
            civilians: number;
            unknowns: number;
            hvts: number;
            children: number;
          },
		  sources: string[];
		  target: {
            targetTypeDetails: string;
            additionalDetails: string;
            location: string;
            targetType: string;
            time: string;
          },
		  killed: {
            status: string;
            additionalDetails: string;
          },
          weapons: {
            terms: string[];
            ambiguous: Boolean;
          }
        },
      }
    ]

}


import { Injectable } from '@angular/core';
import { Http, Response,  Headers, RequestOptions } from '@angular/http';
import {HelperService} from './helper.service';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class StrikeService {
	//URLs
	private urlToSend = '/search';  // URL to GET web api
	private recentStrikesUrl = '/landing/recent-operations';  // URL to GET web api
	private strikeCreate = '/strikes/create'; // URL to POST data
    private strikeDelete = '/strikes/delete/'; // URL to DELETE data
    private strikeEdit = '/strikes/edit/'; // URL to PUT data

	//Input Selections
	public targetedCountrySelection = [
		{ value: null, display: 'Select Country' },
		{ value: 'Somalia', display: 'Somalia' },
		{ value: 'Yemen', display: 'Yemen' },
		{ value: 'Pakistan', display: 'Pakistan' },
		{ value: 'Gaza Strip (Palestine)', display: 'Gaza Strip' },
		{ value: 'West Bank (Palestine)', display: 'West Bank' },
		{ value: 'Syrian Arab Republic', display: 'Syria' },
		{ value: 'Lebanon', display: 'Lebanon' },
		{ value: 'Iraq', display: 'Iraq' },
		{ value: 'Sudan', display: 'Sudan' },
		{ value: 'Egypt', display: 'Egypt' },
		{ value: 'Ecuador', display: 'Ecuador' },
		{ value: 'Qatar', display: 'Qatar' },

		{ value: 'Afghanistan', display: 'Afghanistan' },
		{ value: 'Albania', display: 'Albania' },
		{ value: 'Algeria', display: 'Algeria' },
		{ value: 'Andorra', display: 'Andorra' },
		{ value: 'Angola', display: 'Angola' },
		{ value: 'Argentina', display: 'Argentina' },
		{ value: 'Armenia', display: 'Armenia' },
		{ value: 'Australia', display: 'Australia' },
		{ value: 'Austria', display: 'Austria' },
		{ value: 'Azerbaijan', display: 'Azerbaijan' },
		{ value: 'Bahamas', display: 'Bahamas' },
		{ value: 'Bahrain', display: 'Bahrain' },
		{ value: 'Bangladesh', display: 'Bangladesh' },
		{ value: 'Barbados', display: 'Barbados' },
		{ value: 'Belgium', display: 'Belgium' },
		{ value: 'Belize', display: 'Belize' },
		{ value: 'Benin', display: 'Benin' },
		{ value: 'Bermuda', display: 'Bermuda' },
		{ value: 'Bhutan', display: 'Bhutan' },
		{ value: 'Bolivia', display: 'Bolivia' },
		{ value: 'Bosnia‐Herzegovina', display: 'Bosnia‐Herzegovina' },
		{ value: 'Botswana', display: 'Botswana' },
		{ value: 'Brazil', display: 'Brazil' },
		{ value: 'Brunei', display: 'Brunei' },
		{ value: 'Bulgaria', display: 'Bulgaria' },
		{ value: 'Burkina Faso', display: 'Burkina Faso' },
		{ value: 'Burundi', display: 'Burundi' },
		{ value: 'belarus', display: 'Belarus' },
		{ value: 'Cambodia', display: 'Cambodia' },
		{ value: 'Cameroon', display: 'Cameroon' },
		{ value: 'Canada', display: 'Canada' },
		{ value: 'Cayman islands', display: 'Cayman Islands' },
		{ value: 'Central African  Republic', display: 'Central African  Republic' },
		{ value: 'Chad', display: 'Chad' },
		{ value: 'Chile', display: 'Chile' },
		{ value: 'China', display: 'China' },
		{ value: 'colombia', display: 'Colombia' },
		{ value: 'Comoros', display: 'Comoros' },
		{ value: 'Congo', display: 'Congo' },
		{ value: 'Costa Rica', display: 'Costa Rica' },
		{ value: 'Croatia', display: 'Croatia' },
		{ value: 'Cuba', display: 'Cuba' },
		{ value: 'Cyprus', display: 'Cyprus' },
		{ value: 'Czech Republic', display: 'Czech Republic' },
		{ value: 'Denmark', display: 'Denmark' },
		{ value: 'Djibouti', display: 'Djibouti' },
		{ value: 'Dominica', display: 'Dominica' },
		{ value: 'Dominican Republic', display: 'Dominican Republic' },
		{ value: 'El Salvador ', display: 'El Salvador' },
		{ value: 'Equatorial Guinea', display: 'Equatorial Guinea' },
		{ value: 'Eritrea', display: 'Eritrea' },
		{ value: 'Estonia', display: 'Estonia' },
		{ value: 'Ethiopia', display: 'Ethiopia' },
		{ value: 'Falkland Islands', display: 'Falkland Islands' },
		{ value: 'Fiji', display: 'Fiji' },
		{ value: 'Finland', display: 'Finland' },
		{ value: 'France', display: 'France' },
		{ value: 'French Guiana', display: 'French Guiana' },
		{ value: 'French Polynesia', display: 'French Polynesia' },
		{ value: 'Gabon', display: 'Gabon' },
		{ value: 'Gambia', display: 'Gambia' },
		{ value: 'Georgia', display: 'Georgia' },
		{ value: 'Germany', display: 'Germany' },
		{ value: 'Ghana', display: 'Ghana' },
		{ value: 'Gibraltar', display: 'Gibraltar' },
		{ value: 'Greece', display: 'Greece' },
		{ value: 'Greenland', display: 'Greenland' },
		{ value: 'Grenada', display: 'Grenada' },
		{ value: 'Guadeloupe', display: 'Guadeloupe' },
		{ value: 'Guatemala', display: 'Guatemala' },
		{ value: 'Guinea', display: 'Guinea' },
		{ value: 'Guinea‐Bissau', display: 'Guinea‐Bissau' },
		{ value: 'Guyana', display: 'Guyana' },
		{ value: 'Haiti', display: 'Haiti' },
		{ value: 'Honduras', display: 'Honduras' },
		{ value: 'Hong Kong', display: 'Hong Kong' },
		{ value: 'Hungary', display: 'Hungary' },
		{ value: 'India', display: 'India' },
		{ value: 'Indonesia', display: 'Indonesia' },
		{ value: 'Iran', display: 'Iran' },
		{ value: 'Ireland', display: 'Ireland' },
		{ value: 'Israel', display: 'Israel' },
		{ value: 'Italy', display: 'Italy' },
		{ value: 'Ivory Coast', display: 'Ivory Coast' },
		{ value: 'Jamaica', display: 'Jamaica' },
		{ value: 'Japan', display: 'Japan' },
		{ value: 'Jordan', display: 'Jordan' },
		{ value: 'Kazakhstan', display: 'Kazakhstan' },
		{ value: 'Kenya', display: 'Kenya' },
		{ value: 'Kuwait', display: 'Kuwait' },
		{ value: 'Kyrgyzstan', display: 'Kyrgyzstan' },
		{ value: 'Laos', display: 'Laos' },
		{ value: 'Latvia', display: 'Latvia' },
		{ value: 'Lesotho', display: 'Lesotho' },
		{ value: 'Liberia', display: 'Liberia' },
		{ value: 'Libya', display: 'Libya' },
		{ value: 'Liechtenstein', display: 'Liechtenstein' },
		{ value: 'Lithuania', display: 'Lithuania' },
		{ value: 'Luxembourg', display: 'Luxembourg' },
		{ value: 'Macau', display: 'Macau' },
		{ value: 'Macedonia', display: 'Macedonia' },
		{ value: 'Madagascar', display: 'Madagascar' },
		{ value: 'Malawi', display: 'Malawi' },
		{ value: 'Malaysia', display: 'Malaysia' },
		{ value: 'Maldives', display: 'Maldives' },
		{ value: 'Mali', display: 'Mali' },
		{ value: 'Martinique', display: 'Martinique' },
		{ value: 'Mauritania', display: 'Mauritania' },
		{ value: 'Mauritius', display: 'Mauritius' },
		{ value: 'Mexico', display: 'Mexico' },
		{ value: 'Moldova', display: 'Moldova' },
		{ value: 'Mongolia', display: 'Mongolia' },
		{ value: 'Morocco', display: 'Morocco' },
		{ value: 'Mozambique', display: 'Mozambique' },
		{ value: 'Myanmar', display: 'Myanmar' },
		{ value: 'Namibia', display: 'Namibia' },
		{ value: 'Nepal', display: 'Nepal' },
		{ value: 'Netherlands', display: 'Netherlands' },
		{ value: 'New Caledonia', display: 'New Caledonia' },
		{ value: 'New Zealand', display: 'New Zealand' },
		{ value: 'Nicaragua', display: 'Nicaragua' },
		{ value: 'Niger', display: 'Niger' },
		{ value: 'Nigeria', display: 'Nigeria' },
		{ value: 'North Korea', display: 'North Korea' },
		{ value: 'Northern Mariana  Islandsa', display: 'Northern Mariana  Islands' },
		{ value: 'Norway', display: 'Norway' },
		{ value: 'Oman', display: 'Oman' },
		{ value: 'Panama', display: 'Panama' },
		{ value: 'Papua New Guinea', display: 'Papua New Guinea' },
		{ value: 'Paraguay', display: 'Paraguay' },
		{ value: 'Peru', display: 'Peru' },
		{ value: 'Philippines', display: 'Philippines' },
		{ value: 'Poland', display: 'Poland' },
		{ value: 'Portugal', display: 'Portugal' },
		{ value: 'Puerto Rico', display: 'Puerto Rico' },
		{ value: 'Romania', display: 'Romania' },
		{ value: 'Russian Federation', display: 'Russia' },
		{ value: 'Rwanda', display: 'Rwanda' },
		{ value: 'Saudi Arabia', display: 'Saudi Arabia' },
		{ value: 'Senegal', display: 'Senegal' },
		{ value: 'Serbia‐Montenegro', display: 'Serbia‐Montenegro' },
		{ value: 'Seychelles', display: 'Seychelles' },
		{ value: 'Sierra Leone', display: 'Sierra Leone' },
		{ value: 'Singapore', display: 'Singapore' },
		{ value: 'Slovak Republic', display: 'Slovak Republic' },
		{ value: 'Slovenia', display: 'Slovenia' },
		{ value: 'Solomon Islands', display: 'Solomon Islands' },
		{ value: 'South Africa', display: 'South Africa' },
		{ value: 'South Korea', display: 'South Korea' },
		{ value: 'Spain', display: 'Spain' },
		{ value: 'Sri Lanka', display: 'Sri Lanka' },
		{ value: 'St. Kitts and Nevis', display: 'St. Kitts and Nevis' },
		{ value: 'St. Lucia', display: 'St. Lucia' },
		{ value: 'Suriname', display: 'Suriname' },
		{ value: 'Swaziland', display: 'Swaziland' },
		{ value: 'Sweden', display: 'Sweden' },
		{ value: 'Switzerland', display: 'Switzerland' },
		{ value: 'Taiwan', display: 'Taiwan' },
		{ value: 'Tajikistan', display: 'Tajikistan' },
		{ value: 'Tanzania', display: 'Tanzania' },
		{ value: 'Togo', display: 'Togo' },
		{ value: 'Thailand', display: 'Thailand' },
		{ value: 'Trinidad and  Tobago', display: 'Trinidad and  Tobago' },
		{ value: 'Tunisia', display: 'Tunisia' },
		{ value: 'Turkmenistan', display: 'Turkmenistan' },
		{ value: 'Uganda', display: 'Uganda' },
		{ value: 'Ukraine', display: 'Ukraine' },
		{ value: 'United Arab  Emirates', display: 'United Arab  Emirates' },
		{ value: 'Great Britain', display: 'Great Britain' },
		{ value: 'United States', display: 'United States' },
		{ value: 'Uruguay', display: 'Uruguay' },
		{ value: 'Uzbekistan', display: 'Uzbekistan' },
		{ value: 'Vanuatu', display: 'Vanuatu' },
		{ value: 'Vatican City', display: 'Vatican City' },
		{ value: 'Venezuela', display: 'Venezuela' },
		{ value: 'Vietnam', display: 'Vietnam' },
		{ value: 'Virgin Islands (U.S.)', display: 'Virgin Islands (U.S.)' },
		{ value: 'Wallis and Futuna', display: 'Wallis and Futuna' },
		{ value: 'Zambia', display: 'Zambia' },
		{ value: 'Zimbabwe', display: 'Zimbabwe' },
		{ value: 'Northern Ireland', display: 'Northern Ireland' },
		{ value: 'Yugoslavia', display: 'Yugoslavia' },
		{ value: 'Czechoslovakia', display: 'Czechoslovakia' }
	];
	public attackingCountrySelection = [
		{ value: null, display: 'Select Country' },
		{ value: 'United States', display: 'United States' },
		{ value: 'Israel', display: 'Israel' },
		{ value: 'Turkey', display: 'Turkey' },
		{ value: 'Colombia', display: 'Colombia' },
		{ value: 'Russian Federation', display: 'Russia' },

		{ value: 'Afghanistan', display: 'Afghanistan' },
		{ value: 'Albania', display: 'Albania' },
		{ value: 'Algeria', display: 'Algeria' },
		{ value: 'Andorra', display: 'Andorra' },
		{ value: 'Angola', display: 'Angola' },
		{ value: 'Argentina', display: 'Argentina' },
		{ value: 'Armenia', display: 'Armenia' },
		{ value: 'Australia', display: 'Australia' },
		{ value: 'Austria', display: 'Austria' },
		{ value: 'Azerbaijan', display: 'Azerbaijan' },
		{ value: 'Bahamas', display: 'Bahamas' },
		{ value: 'Bahrain', display: 'Bahrain' },
		{ value: 'Bangladesh', display: 'Bangladesh' },
		{ value: 'Barbados', display: 'Barbados' },
		{ value: 'Belgium', display: 'Belgium' },
		{ value: 'Belize', display: 'Belize' },
		{ value: 'Benin', display: 'Benin' },
		{ value: 'Bermuda', display: 'Bermuda' },
		{ value: 'Bhutan', display: 'Bhutan' },
		{ value: 'Bolivia', display: 'Bolivia' },
		{ value: 'Bosnia‐Herzegovina', display: 'Bosnia‐Herzegovina' },
		{ value: 'Botswana', display: 'Botswana' },
		{ value: 'Brazil', display: 'Brazil' },
		{ value: 'Brunei', display: 'Brunei' },
		{ value: 'Bulgaria', display: 'Bulgaria' },
		{ value: 'Burkina Faso', display: 'Burkina Faso' },
		{ value: 'Burundi', display: 'Burundi' },
		{ value: 'belarus', display: 'Belarus' },
		{ value: 'Cambodia', display: 'Cambodia' },
		{ value: 'Cameroon', display: 'Cameroon' },
		{ value: 'Canada', display: 'Canada' },
		{ value: 'Cayman islands', display: 'Cayman Islands' },
		{ value: 'Central African  Republic', display: 'Central African  Republic' },
		{ value: 'Chad', display: 'Chad' },
		{ value: 'Chile', display: 'Chile' },
		{ value: 'China', display: 'China' },
		{ value: 'Comoros', display: 'Comoros' },
		{ value: 'Congo', display: 'Congo' },
		{ value: 'Costa Rica', display: 'Costa Rica' },
		{ value: 'Croatia', display: 'Croatia' },
		{ value: 'Cuba', display: 'Cuba' },
		{ value: 'Cyprus', display: 'Cyprus' },
		{ value: 'Czech Republic', display: 'Czech Republic' },
		{ value: 'Denmark', display: 'Denmark' },
		{ value: 'Djibouti', display: 'Djibouti' },
		{ value: 'Dominica', display: 'Dominica' },
		{ value: 'Dominican Republic', display: 'Dominican Republic' },
		{ value: 'Ecuador', display: 'Ecuador' },
		{ value: 'Egypt', display: 'Egypt' },
		{ value: 'El Salvador ', display: 'El Salvador' },
		{ value: 'Equatorial Guinea', display: 'Equatorial Guinea' },
		{ value: 'Eritrea', display: 'Eritrea' },
		{ value: 'Estonia', display: 'Estonia' },
		{ value: 'Ethiopia', display: 'Ethiopia' },
		{ value: 'Falkland Islands', display: 'Falkland Islands' },
		{ value: 'Fiji', display: 'Fiji' },
		{ value: 'Finland', display: 'Finland' },
		{ value: 'France', display: 'France' },
		{ value: 'French Guiana', display: 'French Guiana' },
		{ value: 'French Polynesia', display: 'French Polynesia' },
		{ value: 'Gabon', display: 'Gabon' },
		{ value: 'Gambia', display: 'Gambia' },
		{ value: 'Georgia', display: 'Georgia' },
		{ value: 'Germany', display: 'Germany' },
		{ value: 'Ghana', display: 'Ghana' },
		{ value: 'Gibraltar', display: 'Gibraltar' },
		{ value: 'Greece', display: 'Greece' },
		{ value: 'Greenland', display: 'Greenland' },
		{ value: 'Grenada', display: 'Grenada' },
		{ value: 'Guadeloupe', display: 'Guadeloupe' },
		{ value: 'Guatemala', display: 'Guatemala' },
		{ value: 'Guinea', display: 'Guinea' },
		{ value: 'Guinea‐Bissau', display: 'Guinea‐Bissau' },
		{ value: 'Guyana', display: 'Guyana' },
		{ value: 'Haiti', display: 'Haiti' },
		{ value: 'Honduras', display: 'Honduras' },
		{ value: 'Hong Kong', display: 'Hong Kong' },
		{ value: 'Hungary', display: 'Hungary' },
		{ value: 'India', display: 'India' },
		{ value: 'Indonesia', display: 'Indonesia' },
		{ value: 'Iran', display: 'Iran' },
		{ value: 'Iraq', display: 'Iraq' },
		{ value: 'Ireland', display: 'Ireland' },
		{ value: 'Italy', display: 'Italy' },
		{ value: 'Ivory Coast', display: 'Ivory Coast' },
		{ value: 'Jamaica', display: 'Jamaica' },
		{ value: 'Japan', display: 'Japan' },
		{ value: 'Jordan', display: 'Jordan' },
		{ value: 'Kazakhstan', display: 'Kazakhstan' },
		{ value: 'Kenya', display: 'Kenya' },
		{ value: 'Kuwait', display: 'Kuwait' },
		{ value: 'Kyrgyzstan', display: 'Kyrgyzstan' },
		{ value: 'Laos', display: 'Laos' },
		{ value: 'Latvia', display: 'Latvia' },
		{ value: 'Lebanon', display: 'Lebanon' },
		{ value: 'Lesotho', display: 'Lesotho' },
		{ value: 'Liberia', display: 'Liberia' },
		{ value: 'Libya', display: 'Libya' },
		{ value: 'Liechtenstein', display: 'Liechtenstein' },
		{ value: 'Lithuania', display: 'Lithuania' },
		{ value: 'Luxembourg', display: 'Luxembourg' },
		{ value: 'Macau', display: 'Macau' },
		{ value: 'Macedonia', display: 'Macedonia' },
		{ value: 'Madagascar', display: 'Madagascar' },
		{ value: 'Malawi', display: 'Malawi' },
		{ value: 'Malaysia', display: 'Malaysia' },
		{ value: 'Maldives', display: 'Maldives' },
		{ value: 'Mali', display: 'Mali' },
		{ value: 'Martinique', display: 'Martinique' },
		{ value: 'Mauritania', display: 'Mauritania' },
		{ value: 'Mauritius', display: 'Mauritius' },
		{ value: 'Mexico', display: 'Mexico' },
		{ value: 'Moldova', display: 'Moldova' },
		{ value: 'Mongolia', display: 'Mongolia' },
		{ value: 'Morocco', display: 'Morocco' },
		{ value: 'Mozambique', display: 'Mozambique' },
		{ value: 'Myanmar', display: 'Myanmar' },
		{ value: 'Namibia', display: 'Namibia' },
		{ value: 'Nepal', display: 'Nepal' },
		{ value: 'Netherlands', display: 'Netherlands' },
		{ value: 'New Caledonia', display: 'New Caledonia' },
		{ value: 'New Zealand', display: 'New Zealand' },
		{ value: 'Nicaragua', display: 'Nicaragua' },
		{ value: 'Niger', display: 'Niger' },
		{ value: 'Nigeria', display: 'Nigeria' },
		{ value: 'North Korea', display: 'North Korea' },
		{ value: 'Northern Mariana  Islandsa', display: 'Northern Mariana  Islands' },
		{ value: 'Norway', display: 'Norway' },
		{ value: 'Oman', display: 'Oman' },
		{ value: 'Pakistan', display: 'Pakistan' },
		{ value: 'Panama', display: 'Panama' },
		{ value: 'Papua New Guinea', display: 'Papua New Guinea' },
		{ value: 'Paraguay', display: 'Paraguay' },
		{ value: 'Peru', display: 'Peru' },
		{ value: 'Philippines', display: 'Philippines' },
		{ value: 'Poland', display: 'Poland' },
		{ value: 'Portugal', display: 'Portugal' },
		{ value: 'Puerto Rico', display: 'Puerto Rico' },
		{ value: 'Qatar', display: 'Qatar' },
		{ value: 'Romania', display: 'Romania' },
		{ value: 'Rwanda', display: 'Rwanda' },
		{ value: 'Saudi Arabia', display: 'Saudi Arabia' },
		{ value: 'Senegal', display: 'Senegal' },
		{ value: 'Serbia‐Montenegro', display: 'Serbia‐Montenegro' },
		{ value: 'Seychelles', display: 'Seychelles' },
		{ value: 'Sierra Leone', display: 'Sierra Leone' },
		{ value: 'Singapore', display: 'Singapore' },
		{ value: 'Slovak Republic', display: 'Slovak Republic' },
		{ value: 'Slovenia', display: 'Slovenia' },
		{ value: 'Solomon Islands', display: 'Solomon Islands' },
		{ value: 'Somalia', display: 'Somalia' },
		{ value: 'South Africa', display: 'South Africa' },
		{ value: 'South Korea', display: 'South Korea' },
		{ value: 'Spain', display: 'Spain' },
		{ value: 'Sri Lanka', display: 'Sri Lanka' },
		{ value: 'St. Kitts and Nevis', display: 'St. Kitts and Nevis' },
		{ value: 'St. Lucia', display: 'St. Lucia' },
		{ value: 'Sudan', display: 'Sudan' },
		{ value: 'Suriname', display: 'Suriname' },
		{ value: 'Swaziland', display: 'Swaziland' },
		{ value: 'Sweden', display: 'Sweden' },
		{ value: 'Switzerland', display: 'Switzerland' },
		{ value: 'Syrian Arab Republic', display: 'Syria' },
		{ value: 'Taiwan', display: 'Taiwan' },
		{ value: 'Tajikistan', display: 'Tajikistan' },
		{ value: 'Tanzania', display: 'Tanzania' },
		{ value: 'Togo', display: 'Togo' },
		{ value: 'Thailand', display: 'Thailand' },
		{ value: 'Trinidad and  Tobago', display: 'Trinidad and  Tobago' },
		{ value: 'Tunisia', display: 'Tunisia' },
		{ value: 'Turkmenistan', display: 'Turkmenistan' },
		{ value: 'Uganda', display: 'Uganda' },
		{ value: 'Ukraine', display: 'Ukraine' },
		{ value: 'United Arab  Emirates', display: 'United Arab  Emirates' },
		{ value: 'Great Britain', display: 'Great Britain' },
		// { value: 'United States', display: 'United States' },
		{ value: 'Uruguay', display: 'Uruguay' },
		{ value: 'Uzbekistan', display: 'Uzbekistan' },
		{ value: 'Vanuatu', display: 'Vanuatu' },
		{ value: 'Vatican City', display: 'Vatican City' },
		{ value: 'Venezuela', display: 'Venezuela' },
		{ value: 'Vietnam', display: 'Vietnam' },
		{ value: 'Virgin Islands (U.S.)', display: 'Virgin Islands (U.S.)' },
		{ value: 'Wallis and Futuna', display: 'Wallis and Futuna' },
		{ value: 'Yemen', display: 'Yemen' },
		{ value: 'Zambia', display: 'Zambia' },
		{ value: 'Zimbabwe', display: 'Zimbabwe' },
		{ value: 'Northern Ireland', display: 'Northern Ireland' },
		{ value: 'Yugoslavia', display: 'Yugoslavia' },
		{ value: 'Czechoslovakia', display: 'Czechoslovakia' }
	];
	public weaponSelection = [
		{ value: null, display: 'Select Weapon Type' },
		{ value: 'Drone', display: 'Drone' },
		{ value: 'Manned Aircraft', display: 'Manned Aircraft' },
		{ value: 'Firearms', display: 'Firearms' },
		{ value: 'Cruise Missile', display: 'Cruise Missile' },
		{ value: 'Tank', display: 'Tank' },
		{ value: 'Explosives', display: 'Explosives' },
		{ value: 'Poisoning', display: 'Poisoning' },
		{ value: 'Other', display: 'Other' },
		{ value: 'Unknown', display: 'Unknown' }
	];
	public actionSelection = [
		{ value: null, display: 'Select Action Type' },
		{ value: 'Airstrike', display: 'Airstrike' },
		{ value: 'Explosion', display: 'Explosion' },
		{ value: 'Shelling', display: 'Shelling' },
		{ value: 'Shooting', display: 'Shooting' },
		{ value: 'Targeted Killing', display: 'Targeted Killing' },
		{ value: 'Ground Operation', display: 'Ground Operation' },
		{ value: 'Capture Operation', display: 'Capture Operation' },
		{ value: 'Intel', display: 'Intel' },
		{ value: 'Other', display: 'Other' },
		{ value: 'Unknown', display: 'Unknown' }
	];
	public objectSelection = [
		{ value: null, display: 'Select Object Type' },
		{ value: 'Compound', display: 'Compound' },
		{ value: 'Vehicle', display: 'Vehicle' },
		{ value: 'Religious Institution', display: 'Religious Institution' },
		{ value: 'Telecommunication', display: 'Telecommunication' },
		{ value: 'Gatherings', display: 'Gatherings' },
		{ value: 'Marketplace', display: 'Marketplace' },
		{ value: 'Weapons Depot', display: 'Weapons Depot' },
		{ value: 'Intel', display: 'Intel' },
		{ value: 'Other', display: 'Other' },
		{ value: 'Unknown', display: 'Unknown' }
	];
	public statusSelection = [
		{ value: null, display: 'Select Status of Person' },
		{ value: 'hvt', display: 'High-Value Target' },
		{ value: 'civilian', display: 'Civilian' },
		{ value: 'suspected militant', display: 'Suspected Militant' },
		{ value: 'unknown', display: 'Unknown' }
	];
	public time = [
		{ value: null, display: 'Select Time of Day' },
		{ value: 'Morning', display: 'Morning' },
		{ value: 'Afternoon', display: 'Afternoon' },
		{ value: 'Evening', display: 'Evening' },
		{ value: 'Night', display: 'Night' },
		{ value: 'Unclear', display: 'Unclear' }
	];
	public stateStatus = [
		{ value: null, display: 'Select State Status' },
		{ value: 'Peacetime', display: 'Peacetime' },
		{ value: 'Wartime', display: 'Wartime' },
		{ value: 'Unclear', display: 'Unclear' }
	];

	//Search Selections

	options = {
		"targets" : [
						{
										"country" : "Somalia"
						},
						{
										"country" : "Yemen"
						},
						{
										"country" : "Pakistan"
						},
						{
										"country" : "Gaza Strip (Palestine)"
						},
						{
										"country" : "West Bank (Palestine)"
						},
						{
										"country" : "Syrian Arab Republic"
						},
						{
										"country" : "Lebanon"
						},
						{
										"country" : "Egypt"
						},
						{
										"country" : "Iraq"
						},
						{
										"country" : "Sudan"
						},
						{
										"country" : "Ecuador"
						},
						{
										"country" : "Qatar"
						}
		],
		"attackers" : [
						{
										"country" : "United States"
						},
						{
										"country" : "Israel"
						},
						{
										"country" : "Turkey"
						},
						{
										"country" : "Colombia"
						},
						{
										"country" : "Russian Federation"
						}
		],
		"weaponTypes" : [
						{
										"term" : "Drone"
						},
						{
										"term" : "Manned Aircraft"
						},
						{
										"term" : "Firearms"
						},
						{
										"term" : "Cruise Missile"
						},
						{
										"term" : "Tank"
						},
						{
										"term" : "Explosives"
						},
																{
										"term" : "Poisoning"
						},
																{
										"term" : "Other"
						},
																{
										"term" : "Unknown"
						}

		],
		"actionTypes" : [
						{
										"term" : "Airstrike"
						},
						{
										"term" : "Explosion"
						},
																{
										"term" : "Shelling"
						},
																{
										"term" : "Shooting"
						},
																{
										"term" : "Targeted Killing"
						},
																{
										"term" : "Ground Operation"
						},
																{
										"term" : "Capture Operation"
						},
																{
										"term" : "Intel"
						},
																{
										"term" : "Other"
						},
																{
										"term" : "Unknown"
						}
		],
		"excludeWeapons" : false,
		"excludeReviewed": false
	}
	
	//Pakistan
	usInPak = {
			"targets" : [
					{
							"country" : "Somalia"
					},
					{
							"country" : "Yemen"
					},
					{
							"country" : "Pakistan",
							"selected": "true"
					},
					{
							"country" : "Gaza Strip (Palestine)"
					},
					{
							"country" : "West Bank (Palestine)"
					},
					{
							"country" : "Syrian Arab Republic"
					},
					{
							"country" : "Lebanon"
					},
					{
							"country" : "Egypt"
					},
					{
							"country" : "Iraq"
					},
					{
							"country" : "Sudan"
					},
					{
							"country" : "Ecuador"
					},
					{
							"country" : "Qatar"
					}
			],
			"attackers" : [
					{
							"country" : "United States",
							"selected": "true"
					},
					{
							"country" : "Israel"
					},
					{
							"country" : "Turkey"
					},
					{
							"country" : "Colombia"
					},
					{
							"country" : "Russian Federation"
					}
			],
			"weaponTypes" : [
					{
							"term" : "Drone"

					},
					{
							"term" : "Manned Aircraft"
					},
					{
							"term" : "Firearms"
					},
					{
							"term" : "Cruise Missile"
					},
					{
							"term" : "Tank"
					},
					{
							"term" : "Explosives"
					},
																					{
							"term" : "Poisoning"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}

			],
			"actionTypes" : [
					{
							"term" : "Airstrike"
					},
					{
							"term" : "Explosion"
					},
																					{
							"term" : "Shelling"
					},
																					{
							"term" : "Shooting"
					},
																					{
							"term" : "Targeted Killing"
					},
																					{
							"term" : "Ground Operation"
					},
																					{
							"term" : "Capture Operation"
					},
																					{
							"term" : "Intel"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}
			],
			"excludeWeapons" : false
	}

	// Yemen
	usInYemen = {
			"targets" : [
					{
							"country" : "Somalia"
					},
					{
							"country" : "Yemen",
							"selected": "true"
					},
					{
							"country" : "Pakistan"
							
					},
					{
							"country" : "Gaza Strip (Palestine)"
					},
					{
							"country" : "West Bank (Palestine)"
					},
					{
							"country" : "Syrian Arab Republic"
					},
					{
							"country" : "Lebanon"
					},
					{
							"country" : "Egypt"
					},
					{
							"country" : "Iraq"
					},
					{
							"country" : "Sudan"
					},
					{
							"country" : "Ecuador"
					},
					{
							"country" : "Qatar"
					}
			],
			"attackers" : [
					{
							"country" : "United States",
							"selected": "true"
					},
					{
							"country" : "Israel"
					},
					{
							"country" : "Turkey"
					},
					{
							"country" : "Colombia"
					},
					{
							"country" : "Russian Federation"
					}
			],
			"weaponTypes" : [
					{
							"term" : "Drone"

					},
					{
							"term" : "Manned Aircraft"
					},
					{
							"term" : "Firearms"
					},
					{
							"term" : "Cruise Missile"
					},
					{
							"term" : "Tank"
					},
					{
							"term" : "Explosives"
					},
																					{
							"term" : "Poisoning"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}

			],
			"actionTypes" : [
					{
							"term" : "Airstrike"
					},
					{
							"term" : "Explosion"
					},
																					{
							"term" : "Shelling"
					},
																					{
							"term" : "Shooting"
					},
																					{
							"term" : "Targeted Killing"
					},
																					{
							"term" : "Ground Operation"
					},
																					{
							"term" : "Capture Operation"
					},
																					{
							"term" : "Intel"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}
			],
			"excludeWeapons" : false
	}

	// Somalia
	usInSomalia = {
			"targets" : [
					{
							"country" : "Somalia",
							"selected": "true"
					},
					{
							"country" : "Yemen"
					},
					{
							"country" : "Pakistan"
							
					},
					{
							"country" : "Gaza Strip (Palestine)"
					},
					{
							"country" : "West Bank (Palestine)"
					},
					{
							"country" : "Syrian Arab Republic"
					},
					{
							"country" : "Lebanon"
					},
					{
							"country" : "Egypt"
					},
					{
							"country" : "Iraq"
					},
					{
							"country" : "Sudan"
					},
					{
							"country" : "Ecuador"
					},
					{
							"country" : "Qatar"
					}
			],
			"attackers" : [
					{
							"country" : "United States",
							"selected": "true"
					},
					{
							"country" : "Israel"
					},
					{
							"country" : "Turkey"
					},
					{
							"country" : "Colombia"
					},
					{
							"country" : "Russian Federation"
					}
			],
			"weaponTypes" : [
					{
							"term" : "Drone"

					},
					{
							"term" : "Manned Aircraft"
					},
					{
							"term" : "Firearms"
					},
					{
							"term" : "Cruise Missile"
					},
					{
							"term" : "Tank"
					},
					{
							"term" : "Explosives"
					},
																					{
							"term" : "Poisoning"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}

			],
			"actionTypes" : [
					{
							"term" : "Airstrike"
					},
					{
							"term" : "Explosion"
					},
																					{
							"term" : "Shelling"
					},
																					{
							"term" : "Shooting"
					},
																					{
							"term" : "Targeted Killing"
					},
																					{
							"term" : "Ground Operation"
					},
																					{
							"term" : "Capture Operation"
					},
																					{
							"term" : "Intel"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}
			],
			"excludeWeapons" : false
	}

	// Israel
	israel = {
			"targets" : [
					//     {
					//             "country" : "Somalia"
					//     },
					//     {
					//             "country" : "Yemen"
					//     },
					//     {
					//             "country" : "Pakistan"
							
					//     },
					{
							"country" : "Gaza Strip (Palestine)"
					},
					{
							"country" : "West Bank (Palestine)"
					},
					{
							"country" : "Syrian Arab Republic"
					},
					{
							"country" : "Lebanon"
					},
					{
							"country" : "Egypt"
					},
					//     {
					//             "country" : "Iraq"
					//     },
					{
							"country" : "Sudan"
					}
					//     {
					//             "country" : "Ecuador"
					//     },
					//     {
					//             "country" : "Qatar"
					//     }
			],
			"attackers" : [
					{
							"country" : "United States"
					},
					{
							"country" : "Israel",
							"selected": "true"
					},
					{
							"country" : "Turkey"
					},
					{
							"country" : "Colombia"
					},
					{
							"country" : "Russian Federation"
					}
			],
			"weaponTypes" : [
					{
							"term" : "Drone"

					},
					{
							"term" : "Manned Aircraft"
					},
					{
							"term" : "Firearms"
					},
					{
							"term" : "Cruise Missile"
					},
					{
							"term" : "Tank"
					},
					{
							"term" : "Explosives"
					},
																					{
							"term" : "Poisoning"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}

			],
			"actionTypes" : [
					{
							"term" : "Airstrike"
					},
					{
							"term" : "Explosion"
					},
																					{
							"term" : "Shelling"
					},
																					{
							"term" : "Shooting"
					},
																					{
							"term" : "Targeted Killing"
					},
																					{
							"term" : "Ground Operation"
					},
																					{
							"term" : "Capture Operation"
					},
																					{
							"term" : "Intel"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}
			],
			"excludeWeapons" : false
			
	}

	// Turkey
	turkey = {
			"targets" : [
					{
							"country" : "Somalia"
					},
					{
							"country" : "Yemen"
					},
					{
							"country" : "Pakistan"
							
					},
					{
							"country" : "Gaza Strip (Palestine)"
					},
					{
							"country" : "West Bank (Palestine)"
					},
					{
							"country" : "Syrian Arab Republic"
					},
					{
							"country" : "Lebanon"
					},
					{
							"country" : "Egypt"
					},
					{
							"country" : "Iraq"
					},
					{
							"country" : "Sudan"
					},
					{
							"country" : "Ecuador"
					},
					{
							"country" : "Qatar"
					}
			],
			"attackers" : [
					{
							"country" : "United States"
					},
					{
							"country" : "Israel"
					},
					{
							"country" : "Turkey",
							"selected": "true"
					},
					{
							"country" : "Colombia"
					},
					{
							"country" : "Russian Federation"
					}
			],
			"weaponTypes" : [
					{
							"term" : "Drone"

					},
					{
							"term" : "Manned Aircraft"
					},
					{
							"term" : "Firearms"
					},
					{
							"term" : "Cruise Missile"
					},
					{
							"term" : "Tank"
					},
					{
							"term" : "Explosives"
					},
																					{
							"term" : "Poisoning"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}

			],
			"actionTypes" : [
					{
							"term" : "Airstrike"
					},
					{
							"term" : "Explosion"
					},
																					{
							"term" : "Shelling"
					},
																					{
							"term" : "Shooting"
					},
																					{
							"term" : "Targeted Killing"
					},
																					{
							"term" : "Ground Operation"
					},
																					{
							"term" : "Capture Operation"
					},
																					{
							"term" : "Intel"
					},
																					{
							"term" : "Other"
					},
																					{
							"term" : "Unknown"
					}
			],
			"excludeWeapons" : false
	}

	//Filter
	 public weapons = [
		{ value: null, display: 'Any Weapon' },
		{ value: 'drone', display: 'Drone' },
		{ value: 'firearms', display: 'Firearms' },
		{ value: 'manned aircraft', display: 'Manned Aircraft' }
	];
	public attackers = [
		{ value: null, display: 'Any Country' },
		{ value: 'united states', display: 'United States' },
		{ value: 'turkey', display: 'Turkey' },
		{ value: 'israel', display: 'Israel' }
	];
	public targets = [
		{ value: null, display: 'Any Country' },
		{ value: 'yemen', display: 'Yemen' },
		{ value: 'pakistan', display: 'Pakistan' },
		{ value: 'somalia', display: 'Somalia' },
		{ value: 'gaza strip (palestine)', display: 'Gaza Strip (Palestine)' },
		{ value: 'west bank (palestine)', display: 'West Bank (Palestine)' },
		{ value: 'iraq', display: 'Iraq' }
	];
  	constructor(

		  private http:Http,
		  private authHttp: AuthHttp,
		  private help:HelperService

		  ) { }
	
	getOperations():Observable<Strike[]> {

    	return this.http.get(this.recentStrikesUrl)
                .map(this.help.extractData)
                  .catch(this.help.handleError);
  	}
	getOperation(id:number):Observable<Strike> {
		return this.getOperations()
                .map(strikes => strikes.find(strike => strike.strikeId === id))
                  .catch(this.help.handleError);
  	}
	getStrikeList(searchTerms): Observable<any[]> {
        let details = JSON.stringify(searchTerms);  
        let headers      = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.urlToSend, details, options) // ...using post request
                            .map(this.help.extractData) // ...and calling .json() on the response to return data
                                .catch(this.help.handleError); //...errors if any
    }
    getStrike(strikeId) {
        let details = { strikeId: strikeId };

        return this.http.post(this.urlToSend, details)
							.map(this.help.extractData) // ...and calling .json() on the response to return data
								.catch(this.help.handleError); //...errors if any
	}; 


	// Delete a strike 
    removeStrike (strike): Observable<any[]> {
        return this.authHttp.delete(this.strikeDelete + strike._id) // ...using put request
                        .map(this.help.extractData) // ...and calling .json() on the response to return data
                                    .catch(this.help.handleError); //...errors if any
    }   

    // Update a strike
    updateStrike (strike): Observable<any[]> {
        let json = JSON.stringify(strike); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.put(this.strikeEdit + strike._id, json, options) // ...using put request
                       .map(this.help.extractData) // ...and calling .json() on the response to return data
                                    .catch(this.help.handleError); //...errors if any
    }  
// Add a new strike
    addStrike (strike): Observable<any[]> {
        const json = JSON.stringify(strike);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.post(this.strikeCreate, json, options) // ...using post request
                         .map(this.help.extractData) // ...and calling .json() on the response to return data
                         .catch(this.help.handleError); //...errors if any
    }  

	
}
