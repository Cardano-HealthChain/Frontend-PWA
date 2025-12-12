// // lib/healthchain.service.ts
// import { Lucid, Data, UTxO } from 'lucid-cardano';
// import blueprint from './plutus.json';

// // Validator addresses from your deployment guide
// const VALIDATORS = {
//     clinic: 'addr_test1wpat0u0jwy7kjazrpzn8arj6w3zl8x4npyslr05fy72z38c9qthg0',
//     did: 'addr_test1qqunsfy9vet8wa5qk6qy87xh42kdrneseazv3wpurwwy6dsp5wyjn',
//     vc: 'addr_test1wpzwl3u39zy77dpsu0cnnqkxke03r927c28wacgmx8q0a5saqawj',
//     anchor: 'addr_test1wpgfx77rugwnfyfrpznxm8jcuaz67dfeysfw8573e3z2dtgfq9apu'
// };

// export class HealthChainService {
//     constructor(private lucid: Lucid) { }

//     // Register a clinic
//     async registerClinic(clinicDid: string, clinicName: string, location: string) {
//         try {
//             // Get the clinic validator
//             const clinicValidator = blueprint.validators.find(
//                 v => v.title === 'clinic.clinic_validator.spend'
//             );

//             if (!clinicValidator) {
//                 throw new Error('Clinic validator not found in blueprint');
//             }

//             const validatorAddress = this.lucid.utils.validatorToAddress({
//                 type: 'PlutusV3',
//                 script: clinicValidator.compiledCode
//             });

//             // Create clinic registration datum
//             const datum = Data.to({
//                 clinic_did: clinicDid,
//                 name: clinicName,
//                 location: location,
//                 timestamp: BigInt(Date.now())
//             });

//             // Build and submit transaction
//             const tx = await this.lucid.newTx()
//                 .payToContract(validatorAddress, { inline: datum }, { lovelace: 5000000n })
//                 .complete();

//             const signedTx = await tx.sign().complete();
//             const txHash = await signedTx.submit();

//             return {
//                 success: true,
//                 txHash,
//                 explorerUrl: `https://preprod.cardanoscan.io/transaction/${txHash}`
//             };
//         } catch (error: any) {
//             console.error('Register clinic error:', error);
//             return {
//                 success: false,
//                 error: error.message || 'Failed to register clinic'
//             };
//         }
//     }

//     // Issue a Verifiable Credential
//     async issueCredential(
//         patientDid: string,
//         credentialType: string,
//         credentialData: any
//     ) {
//         try {
//             const vcValidator = blueprint.validators.find(
//                 v => v.title === 'vc.vc_validator.spend'
//             );

//             if (!vcValidator) {
//                 throw new Error('VC validator not found');
//             }

//             const validatorAddress = this.lucid.utils.validatorToAddress({
//                 type: 'PlutusV3',
//                 script: vcValidator.compiledCode
//             });

//             // Get issuer DID from connected wallet
//             const issuerAddress = await this.lucid.wallet.address();
//             const issuerDid = `did:healthchain:${issuerAddress.slice(0, 20)}`;

//             // Create VC datum
//             const datum = Data.to({
//                 issuer: issuerDid,
//                 subject: patientDid,
//                 credential_type: credentialType,
//                 credential_data: JSON.stringify(credentialData),
//                 issuance_date: BigInt(Date.now()),
//                 valid: true
//             });

//             const tx = await this.lucid.newTx()
//                 .payToContract(validatorAddress, { inline: datum }, { lovelace: 5000000n })
//                 .complete();

//             const signedTx = await tx.sign().complete();
//             const txHash = await signedTx.submit();

//             return {
//                 success: true,
//                 txHash,
//                 explorerUrl: `https://preprod.cardanoscan.io/transaction/${txHash}`
//             };
//         } catch (error: any) {
//             console.error('Issue credential error:', error);
//             return {
//                 success: false,
//                 error: error.message || 'Failed to issue credential'
//             };
//         }
//     }

//     // Register a DID
//     async registerDid(didDocument: any) {
//         try {
//             const didValidator = blueprint.validators.find(
//                 v => v.title === 'did.did_validator.spend'
//             );

//             if (!didValidator) {
//                 throw new Error('DID validator not found');
//             }

//             const validatorAddress = this.lucid.utils.validatorToAddress({
//                 type: 'PlutusV3',
//                 script: didValidator.compiledCode
//             });

//             const ownerAddress = await this.lucid.wallet.address();
//             const did = `did:healthchain:${ownerAddress.slice(0, 20)}`;

//             const datum = Data.to({
//                 did: did,
//                 document: JSON.stringify(didDocument),
//                 owner: this.lucid.utils.paymentCredentialOf(ownerAddress).hash,
//                 created: BigInt(Date.now()),
//                 updated: BigInt(Date.now())
//             });

//             const tx = await this.lucid.newTx()
//                 .payToContract(validatorAddress, { inline: datum }, { lovelace: 5000000n })
//                 .complete();

//             const signedTx = await tx.sign().complete();
//             const txHash = await signedTx.submit();

//             return {
//                 success: true,
//                 did,
//                 txHash,
//                 explorerUrl: `https://preprod.cardanoscan.io/transaction/${txHash}`
//             };
//         } catch (error: any) {
//             console.error('Register DID error:', error);
//             return {
//                 success: false,
//                 error: error.message || 'Failed to register DID'
//             };
//         }
//     }

//     // Query UTxOs at validator address
//     async queryValidatorUtxos(validatorName: 'clinic' | 'did' | 'vc' | 'anchor'): Promise<UTxO[]> {
//         try {
//             const address = VALIDATORS[validatorName];
//             const utxos = await this.lucid.utxosAt(address);
//             return utxos;
//         } catch (error) {
//             console.error('Query UTxOs error:', error);
//             return [];
//         }
//     }

//     // Get clinic details by DID
//     async getClinicByDid(clinicDid: string) {
//         try {
//             const utxos = await this.queryValidatorUtxos('clinic');

//             for (const utxo of utxos) {
//                 if (utxo.datum) {
//                     const datum = Data.from(utxo.datum);
//                     if (datum.clinic_did === clinicDid) {
//                         return {
//                             success: true,
//                             clinic: {
//                                 did: datum.clinic_did,
//                                 name: datum.name,
//                                 location: datum.location,
//                                 timestamp: Number(datum.timestamp)
//                             }
//                         };
//                     }
//                 }
//             }

//             return {
//                 success: false,
//                 error: 'Clinic not found'
//             };
//         } catch (error: any) {
//             return {
//                 success: false,
//                 error: error.message || 'Failed to get clinic'
//             };
//         }
//     }
// }